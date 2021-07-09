import { Connection, getCustomRepository } from "typeorm";
import { useInMemoryDB } from "../../infra/database/useInMemoryDB";
import { factory, tearDownDatabase, useSeeding } from "typeorm-seeding";
import "../../infra/factories/DesenvolvedorFactory";
import { Desenvolvedor } from "../../../src/entities/Desenvolvedor";
import { ValidatorErrorResponse } from "../../../src/helpers/ValidatorErrorResponse";
import { AtualizarDesenvolvedorService } from "../../../src/services/AtualizarDesenvolvedorService";
import { DesenvolvedorRepository } from "../../../src/repositories/DesenvolvedorRepository";
import { assert } from "chai";

describe("Atualizar desenvolvedor service", () => {
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

  it("Atualizar desenvolvedor com sucesso", async () => {
    const service = new AtualizarDesenvolvedorService();
    const repo = getCustomRepository(DesenvolvedorRepository);

    const novoNome = "Homer Simpson";

    const devAtualizado = await service.execute(desenvolvedor.id, {
      nome: novoNome,
      sexo: desenvolvedor.sexo,
      hobby: desenvolvedor.hobby,
      data_nascimento: desenvolvedor.data_nascimento,
    });

    const devConsultado = await repo.findOne(desenvolvedor.id);

    assert.exists(devConsultado);
    assert.deepEqual(devAtualizado, devConsultado);
    assert.equal(devConsultado?.nome, novoNome);
  });

  it("Atualizar desenvolvedor com erros de validação", async () => {
    const service = new AtualizarDesenvolvedorService();

    await expect(
      service.execute(desenvolvedor.id, {
        nome: "",
        sexo: desenvolvedor.sexo,
        hobby: desenvolvedor.hobby,
        data_nascimento: desenvolvedor.data_nascimento,
      })
    ).rejects.toThrow(ValidatorErrorResponse);
  });

  it("Atualizar desenvolvedor não existente", async () => {
    const service = new AtualizarDesenvolvedorService();

    await expect(
      service.execute(19, {
        nome: "Breno Carlos",
        sexo: desenvolvedor.sexo,
        hobby: desenvolvedor.hobby,
        data_nascimento: desenvolvedor.data_nascimento,
      })
    ).rejects.toThrow(Error);
  });
});
