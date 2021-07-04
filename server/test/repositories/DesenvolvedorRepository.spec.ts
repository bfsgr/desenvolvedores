import { Connection, getCustomRepository } from "typeorm";
import { DesenvolvedorRepository } from "../../src/repositories/DesenvolvedorRepository";
import { useInMemoryDB } from "../infra/useInMemoryDB";
import {
  factory,
  runSeeder,
  tearDownDatabase,
  useSeeding,
} from "typeorm-seeding";
import { assert } from "chai";
import {
  count,
  CreateDesenvolvedoresSeeder,
} from "../infra/seeds/CreateDesenvolvedoresSeeder";
import { Desenvolvedor } from "../../src/entities/Desenvolvedor";

describe("Listar desenvolvedores", () => {
  let connection: Connection;
  let dbDevsCount = count;

  beforeAll(async () => {
    connection = await useInMemoryDB();
    await useSeeding();

    await factory(Desenvolvedor)().create({ nome: "Amélia Simpson" });
    dbDevsCount += 1;

    await runSeeder(CreateDesenvolvedoresSeeder);
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  it("Listar todos os desenvolvedores", async () => {
    const devRepo = getCustomRepository(DesenvolvedorRepository);
    const [devs, count] = await devRepo.listarComBuscaEPaginacao();

    assert.lengthOf(devs, dbDevsCount);
    assert.equal(count, dbDevsCount);
  });

  it("Buscar por nome", async () => {
    const devRepo = getCustomRepository(DesenvolvedorRepository);

    const [devs, count] = await devRepo.listarComBuscaEPaginacao("Amélia");

    assert.lengthOf(devs, 1);
    assert.equal(count, 1);
  });

  it("Listar paginado", async () => {
    const page = 2;
    const limit = 5;
    const devRepo = getCustomRepository(DesenvolvedorRepository);

    const [devs, count] = await devRepo.listarComBuscaEPaginacao(
      undefined,
      page,
      limit
    );

    assert.equal(count, dbDevsCount);

    const offset = (page - 1) * limit;

    const allDevs = await devRepo.find();

    assert.sameDeepMembers(devs, allDevs.slice(offset, offset + limit));
  });
});
