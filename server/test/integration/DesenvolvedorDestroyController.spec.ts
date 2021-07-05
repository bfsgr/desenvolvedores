import { API } from "../../src/api";
import { Connection, getCustomRepository } from "typeorm";
import { usePgTestDatabase } from "../infra/database/usePgTestDatabase";
import { factory, tearDownDatabase, useSeeding } from "typeorm-seeding";
import "../infra/factories/DesenvolvedorFactory";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { DesenvolvedorRepository } from "../../src/repositories/DesenvolvedorRepository";
import { Express } from "express";
import { Desenvolvedor } from "../../src/entities/Desenvolvedor";

describe("Endpoint DELETE /developers/:id", () => {
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

  it("Deve remover o primeiro desenvolvedor", async () => {
    await request(server)
      .delete(`/developers/${desenvolvedor.id}`)
      .set("Accept", "application/json")
      .expect(StatusCodes.NO_CONTENT);
  });

  it("Deve retornar não encontrado", async () => {
    await request(server)
      .delete("/developers/90")
      .set("Accept", "application/json")
      .expect(StatusCodes.BAD_REQUEST);
  });

  it("Deve retornar erro para um id inválido", async () => {
    await request(server)
      .delete("/developers/ata1")
      .set("Accept", "application/json")
      .expect(StatusCodes.BAD_REQUEST);
  });
});
