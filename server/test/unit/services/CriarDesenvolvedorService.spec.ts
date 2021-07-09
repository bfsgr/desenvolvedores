import { Connection, getCustomRepository } from "typeorm";
import { useInMemoryDB } from "../../infra/database/useInMemoryDB";
import { CriarDesenvolvedorService } from "../../../src/services/CriarDesenvolvedorService";
import { factory } from "typeorm-seeding";
import "../../infra/factories/DesenvolvedorFactory";
import { Desenvolvedor } from "../../../src/entities/Desenvolvedor";
import { DesenvolvedorRepository } from "../../../src/repositories/DesenvolvedorRepository";
import { assert } from "chai";
import { ValidatorErrorResponse } from "../../../src/helpers/ValidatorErrorResponse";

describe("Criar desenvolvedor service", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await useInMemoryDB();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Cria desenvolvedor com sucesso", async () => {
    const repo = getCustomRepository(DesenvolvedorRepository);
    const service = new CriarDesenvolvedorService();

    const dev = await factory(Desenvolvedor)().create();

    const devCriado = await service.execute({ ...dev });

    assert.exists(repo.findOne(devCriado.id));
  });

  it("Cria desenvolvedor com erros de validação", async () => {
    const service = new CriarDesenvolvedorService();

    const dev = await factory(Desenvolvedor)().create();
    dev.nome = "a";

    await expect(service.execute({ ...dev })).rejects.toThrow(
      ValidatorErrorResponse
    );
  });
});
