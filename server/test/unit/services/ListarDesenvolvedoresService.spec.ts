import { Connection, getCustomRepository } from "typeorm";
import { useInMemoryDB } from "../../infra/database/useInMemoryDB";
import {
  factory,
  runSeeder,
  tearDownDatabase,
  useSeeding,
} from "typeorm-seeding";
import "../../infra/factories/DesenvolvedorFactory";
import { Desenvolvedor } from "../../../src/entities/Desenvolvedor";
import { DesenvolvedorRepository } from "../../../src/repositories/DesenvolvedorRepository";
import { assert } from "chai";
import { ListarDesenvolvedoresService } from "../../../src/services/ListarDesenvolvedoresService";
import {
  count as seederCount,
  CreateDesenvolvedoresSeeder,
} from "../../infra/seeds/CreateDesenvolvedoresSeeder";

describe("Listar desenvolvedores service", () => {
  let connection: Connection;
  let repository: DesenvolvedorRepository;
  let desenvolvedor: Desenvolvedor;
  let totalSeeded = seederCount;

  beforeAll(async () => {
    connection = await useInMemoryDB();
    await useSeeding();

    desenvolvedor = await factory(Desenvolvedor)().create({
      nome: "Breno Carlos",
    });
    totalSeeded += 1;

    await runSeeder(CreateDesenvolvedoresSeeder);

    repository = getCustomRepository(DesenvolvedorRepository);
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  it("Listar todos desenvolvedores", async () => {
    const service = new ListarDesenvolvedoresService();

    const { devs, count } = await service.execute();

    assert.equal(count, totalSeeded);
    assert.sameDeepMembers(devs, await repository.find());
  });

  it("Listar desenvolvedores com paginação", async () => {
    const page = 3;
    const limit = 2;

    const service = new ListarDesenvolvedoresService();

    const { devs, count } = await service.execute(page, limit);

    assert.equal(count, totalSeeded);

    const offset = (page - 1) * limit;

    const allDevs = await repository.find();

    assert.sameDeepMembers(devs, allDevs.slice(offset, offset + limit));
  });

  it("Listar desenvolvedores com pesquisa por nome", async () => {
    const service = new ListarDesenvolvedoresService();

    const { devs, count } = await service.execute(
      undefined,
      undefined,
      "Breno C"
    );

    assert.equal(count, 1);
    assert.deepInclude(devs[0], desenvolvedor);
  });

  it("Deve gerar erro porque page foi usado sem limit", async () => {
    const service = new ListarDesenvolvedoresService();
    await expect(service.execute(1)).rejects.toThrow(Error);
  });

  it("Deve gerar erro porque limit foi usado sem page", async () => {
    const service = new ListarDesenvolvedoresService();
    await expect(service.execute(undefined, 1)).rejects.toThrow(Error);
  });
});
