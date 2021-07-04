import { Desenvolvedor } from "../../../src/entities/Desenvolvedor";
import { define } from "typeorm-seeding";
import * as Faker from "faker";
import { Sexo } from "../../../src/enums/Sexo";
import dayjs from "dayjs";

define(Desenvolvedor, (faker: typeof Faker) => {
  const dev = new Desenvolvedor();
  dev.nome = faker.name.firstName() + " " + faker.name.lastName();
  dev.sexo = faker.random.arrayElement(Object.values(Sexo));
  dev.hobby = faker.hacker.phrase();
  dev.data_nascimento = faker.date.between(
    new Date("1900-01-01"),
    dayjs().subtract(18, "years").toDate()
  );

  return dev;
});
