import { Connection } from "typeorm";
import { useInMemoryDB } from "../../infra/database/useInMemoryDB";
import { factory, tearDownDatabase, useSeeding } from "typeorm-seeding";
import "../../infra/factories/DesenvolvedorFactory";
import { Desenvolvedor } from "../../../src/entities/Desenvolvedor";
import { assert } from "chai";
import { MostrarDesenvolvedorService } from "../../../src/services/MostrarDesenvolvedorService";
import { ErrorNotFound } from "../../../src/helpers/ErrorNotFound";

describe("Mostrar desenvolvedor service", () => {
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

  it("Mostrar com sucesso", async () => {
    const service = new MostrarDesenvolvedorService();

    const devEncontrado = await service.execute(desenvolvedor.id);
    //desenvolvedor não tem idade, por vemos se o encontrado tem tudo do criado pela factory
    assert.deepInclude(devEncontrado, desenvolvedor);
  });

  it("Desenvolvedor não encontrado", async () => {
    const service = new MostrarDesenvolvedorService();

    await expect(service.execute(18)).rejects.toThrow(ErrorNotFound);
  });
});
