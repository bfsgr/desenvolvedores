import { API } from "../../src/api";
import { Connection, getCustomRepository } from "typeorm";
import { usePgTestDatabase } from "../infra/database/usePgTestDatabase";
import {
  factory,
  runSeeder,
  tearDownDatabase,
  useSeeding,
} from "typeorm-seeding";
import {
  count as seederCount,
  CreateDesenvolvedoresSeeder,
} from "../infra/seeds/CreateDesenvolvedoresSeeder";
import "../infra/factories/DesenvolvedorFactory";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { DesenvolvedorRepository } from "../../src/repositories/DesenvolvedorRepository";
import { assert } from "chai";
import { Express } from "express";
import { Desenvolvedor } from "../../src/entities/Desenvolvedor";

describe("Endpoint GET /developers", () => {
  let server: Express;
  let connection: Connection;
  let totalCount = seederCount;
  let repo: DesenvolvedorRepository;

  beforeAll(async () => {
    connection = await usePgTestDatabase();

    server = new API().app;

    repo = getCustomRepository(DesenvolvedorRepository);

    await useSeeding();

    await factory(Desenvolvedor)().create({ nome: "Bruno Santana" });
    await factory(Desenvolvedor)().create({ nome: "Bruno Ferreira" });
    totalCount += 2;

    await runSeeder(CreateDesenvolvedoresSeeder);
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  it("Deve listar todos os desenvolvedores", async () => {
    const res = await request(server)
      .get("/developers")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK);

    assert.lengthOf(res.body, totalCount);
  });

  it("Deve listar todos os desenvolvedores paginado", async () => {
    const page = 1;
    const limit = 5;
    const res = await request(server)
      .get("/developers")
      .query({ page: page })
      .query({ limit: limit })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK);

    assert.lengthOf(res.body, 5);
    assert.equal(res.body[0].id, 1);

    assert.equal(res.headers["x-total-count"], totalCount);
    assert.equal(res.headers["x-total-pages"], Math.ceil(totalCount / limit));
    assert.equal(res.headers["x-page-items"], limit);
    assert.equal(res.headers["x-current-page"], page);
  });

  it("Deve listar todos os desenvolvedores com busca", async () => {
    const res = await request(server)
      .get("/developers")
      .query({ nome: "Bruno" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK);

    assert.lengthOf(res.body, 2);

    res.body.forEach((dev: Desenvolvedor) => {
      assert.match(dev.nome, /^Bruno/);
    });
  });

  it("Deve retornar erro quando page for usado sem limit", async () => {
    await request(server)
      .get("/developers")
      .query({ page: 5 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar erro quando page for negativo ou zero", async () => {
    await request(server)
      .get("/developers")
      .query({ page: 0 })
      .query({ limit: 10 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar erro quando limit for negativo ou zero", async () => {
    await request(server)
      .get("/developers")
      .query({ page: 1 })
      .query({ limit: 0 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar erro quando limit for usado sem page", async () => {
    await request(server)
      .get("/developers")
      .query({ limit: 5 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar não encontrado quando tentar acessar uma pagina não existente", async () => {
    await request(server)
      .get("/developers")
      .query({ page: 2 })
      .query({ limit: totalCount })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.NOT_FOUND);
  });

  it("Deve retornar não encontrado quando uma busca não encontrar nada", async () => {
    await request(server)
      .get("/developers")
      .query({ nome: "Miss" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.NOT_FOUND);
  });
});
