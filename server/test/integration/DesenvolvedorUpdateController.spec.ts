import { API } from "../../src/api";
import { Connection, getCustomRepository } from "typeorm";
import { usePgTestDatabase } from "../infra/database/usePgTestDatabase";
import { factory, tearDownDatabase, useSeeding } from "typeorm-seeding";
import "../infra/factories/DesenvolvedorFactory";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { DesenvolvedorRepository } from "../../src/repositories/DesenvolvedorRepository";
import { assert } from "chai";
import { Express } from "express";
import { Desenvolvedor } from "../../src/entities/Desenvolvedor";

describe("Endpoint POST /developers", () => {
  let server: Express;
  let connection: Connection;
  let repo: DesenvolvedorRepository;
  let desenvolvedor: Desenvolvedor;

  beforeAll(async () => {
    connection = await usePgTestDatabase();

    server = new API().app;

    repo = getCustomRepository(DesenvolvedorRepository);

    await useSeeding();

    desenvolvedor = await factory(Desenvolvedor)().create();
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  it("Deve atualiza um desenvolvedor", async () => {
    const novasInfos = await factory(Desenvolvedor)().create();

    await request(server)
      .put(`/developers/${desenvolvedor.id}`)
      .send({
        nome: novasInfos.nome,
        hobby: desenvolvedor.hobby,
        sexo: desenvolvedor.sexo.toString(),
        data_nascimento: desenvolvedor.data_nascimento.toISOString(),
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK);

    const repoDev = await repo.findOne(desenvolvedor.id);

    assert.equal(repoDev?.nome, novasInfos.nome);
  });

  it("Deve não atualizar um desenvolvedor por falhas de validação", async () => {
    await request(server)
      .put(`/developers/${desenvolvedor.id}`)
      .send({
        nome: "",
        hobby: desenvolvedor.hobby,
        sexo: desenvolvedor.sexo.toString(),
        data_nascimento: desenvolvedor.data_nascimento.toISOString(),
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("Deve não atualizar um desenvolvedor por este não existir", async () => {
    await request(server)
      .put(`/developers/198`)
      .send({
        nome: desenvolvedor.nome,
        hobby: desenvolvedor.hobby,
        sexo: desenvolvedor.sexo.toString(),
        data_nascimento: desenvolvedor.data_nascimento.toISOString(),
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("Deve não atualizar um desenvolvedor por id inválido", async () => {
    await request(server)
      .put(`/developers/aft`)
      .send({
        nome: desenvolvedor.nome,
        hobby: desenvolvedor.hobby,
        sexo: desenvolvedor.sexo.toString(),
        data_nascimento: desenvolvedor.data_nascimento.toISOString(),
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.BAD_REQUEST);
  });
});
