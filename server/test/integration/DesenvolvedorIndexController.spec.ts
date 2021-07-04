import { Server } from "../../src/api";
import { Connection, getCustomRepository } from "typeorm";
import { usePgTestDatabase } from "../infra/database/usePgTestDatabase";
import { runSeeder, tearDownDatabase, useSeeding } from "typeorm-seeding";
import {
  CreateDesenvolvedoresSeeder,
  count as totalCount,
} from "../infra/seeds/CreateDesenvolvedoresSeeder";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import { DesenvolvedorRepository } from "../../src/repositories/DesenvolvedorRepository";
import { assert } from "chai";

describe("Endpoint GET /developers", () => {
  const server = new Server().app;
  let connection: Connection;
  let repo: DesenvolvedorRepository;

  beforeAll(async () => {
    connection = await usePgTestDatabase();
    repo = getCustomRepository(DesenvolvedorRepository);
    await useSeeding();
    await runSeeder(CreateDesenvolvedoresSeeder);
  });

  afterAll(async () => {
    await tearDownDatabase();
  });

  it("Deve listar todos os desenvolvedores", (done) => {
    request(server)
      .get("/developers")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(StatusCodes.OK)
      .end((err, res) => {
        if (err) return done(err);

        assert.lengthOf(res.body, totalCount);
        done();
      });
  });
});
