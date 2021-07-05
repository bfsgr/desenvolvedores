import { API } from "../../src/api";
import { Connection, getCustomRepository } from "typeorm";
import { usePgTestDatabase } from "../infra/database/usePgTestDatabase";
import { factory } from "typeorm-seeding";
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

  beforeAll(async () => {
    connection = await usePgTestDatabase();

    server = new API().app;

    repo = getCustomRepository(DesenvolvedorRepository);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Deve criar um desenvolvedor", async () => {
    const dev = await factory(Desenvolvedor)().create();

    const res = await request(server)
      .post("/developers/")
      .send({
        nome: dev.nome,
        hobby: dev.hobby,
        sexo: dev.sexo.toString(),
        data_nascimento: dev.data_nascimento.toISOString(),
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.CREATED);

    assert.exists(await repo.find(res.body.id));
  });

  it("Deve não criar um desenvolvedor por falhas de validação", async () => {
    const dev = await factory(Desenvolvedor)().create();

    await request(server)
      .post("/developers/")
      .send({
        nome: "",
        hobby: dev.hobby,
        sexo: dev.sexo.toString(),
        data_nascimento: dev.data_nascimento.toISOString(),
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.BAD_REQUEST);
  });
});
