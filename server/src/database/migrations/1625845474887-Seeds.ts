import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import * as faker from "faker";
import { Desenvolvedor } from "../../entities/Desenvolvedor";
import { Sexo } from "../../enums/Sexo";
import dayjs from "dayjs";

export class Seeds1625845474887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = getRepository("desenvolvedor");
    for (let i = 0; i < 100; i++) {
      await repo.save({
        nome: faker.name.firstName() + " " + faker.name.lastName(),
        sexo: faker.random.arrayElement(Object.values(Sexo)),
        hobby: faker.hacker.phrase(),
        data_nascimento: faker.date.between(
          new Date("1900-01-01"),
          dayjs().subtract(18, "years").toDate()
        ),
      });
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE "desenvolvedor"`);
  }
}
