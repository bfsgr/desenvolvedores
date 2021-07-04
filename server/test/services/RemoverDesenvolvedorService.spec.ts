import { Connection, getCustomRepository } from "typeorm";
import { useInMemoryDB } from "../infra/useInMemoryDB";
import { factory, tearDownDatabase, useSeeding } from "typeorm-seeding";
import "../infra/factories/DesenvolvedorFactory";
import { Desenvolvedor } from "../../src/entities/Desenvolvedor";
import { DesenvolvedorRepository } from "../../src/repositories/DesenvolvedorRepository";
import { assert } from "chai";
import { RemoverDesenvolvedorService } from "../../src/services/RemoverDesenvolvedorService";

describe("Remover desenvolvedor service", () => {
  let connection: Connection;
  let desenvolvedor: Desenvolvedor;

  beforeAll(async () => {
    connection = await useInMemoryDB();
    await useSeeding();

    desenvolvedor = await factory(Desenvolvedor)().create();
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  it("Removido com sucesso", async () => {
    const repo = getCustomRepository(DesenvolvedorRepository);
    const service = new RemoverDesenvolvedorService();

    await service.execute(desenvolvedor.id);

    assert.notExists(await repo.findOne(desenvolvedor.id));
  });

  it("Desenvolvedor não encontrado", async () => {
    const service = new RemoverDesenvolvedorService();

    await expect(service.execute(18)).rejects.toThrow(Error);
  });
});
