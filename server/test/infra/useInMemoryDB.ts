import { createConnection } from "typeorm";
import { Desenvolvedor } from "../../src/entities/Desenvolvedor";

export async function useInMemoryDB() {
  return await createConnection({
    type: "sqlite",
    database: ":memory:",
    entities: [Desenvolvedor],
    logging: false,
    dropSchema: true,
    synchronize: true,
  });
}
