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

describe("Endpoint GET /developers/:id", () => {
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

  it("Deve mostrar o primeiro desenvolvedor", async () => {
    const res = await request(server)
      .get(`/developers/${desenvolvedor.id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK);

    assert.equal(desenvolvedor.id, res.body.id);
  });

  it("Deve retornar não encontrado", async () => {
    await request(server)
      .get("/developers/90")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.NOT_FOUND);
  });

  it("Deve retornar erro para um id inválido", async () => {
    await request(server)
      .get("/developers/ata1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.BAD_REQUEST);
  });
});
