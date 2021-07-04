import { createConnection } from "typeorm";
import { Desenvolvedor } from "../../../src/entities/Desenvolvedor";

export async function usePgTestDatabase() {
  const port = process.env.POSTGRES_PORT
    ? Number.parseInt(process.env.POSTGRES_PORT)
    : 5432;
  return await createConnection({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: port,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES__TEST_DBNAME,
    entities: [Desenvolvedor],
    logging: false,
    dropSchema: true,
    synchronize: true,
  });
}
