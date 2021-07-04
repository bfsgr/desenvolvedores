import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import "../factories/DesenvolvedorFactory";
import { Desenvolvedor } from "../../../src/entities/Desenvolvedor";

export const count = 20;

export class CreateDesenvolvedoresSeeder implements Seeder {
  public async run(factory: Factory, conn: Connection) {
    await factory(Desenvolvedor)().createMany(count);
  }
}
