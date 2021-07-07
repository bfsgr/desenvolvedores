import {
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  IsDate,
  IsDefined,
  IsEnum,
  MaxDate,
  MaxLength,
  MinLength,
} from "class-validator";
import dayjs from "dayjs";

import {
  isDateMessage,
  isDefinedMessage,
  lengthGreaterThanMessage,
  lengthLessThanMessage,
  maxDateMessage,
} from "../helpers/MensagensDeErro";
import { Sexo } from "../enums/Sexo";

@Entity()
export class Desenvolvedor {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @MinLength(3, { message: lengthLessThanMessage })
  @MaxLength(80, { message: lengthGreaterThanMessage })
  @IsDefined({ message: isDefinedMessage })
  @Column({ type: "varchar", length: 80 })
  nome: string;

  protected idade: number;

  @Column({ type: "varchar", length: 1, enum: Sexo })
  @IsEnum(Sexo, { message: "$property deve ser 'M' ou 'F'" })
  @IsDefined({ message: isDefinedMessage })
  sexo: Sexo;

  @IsDefined({ message: isDefinedMessage })
  @MinLength(3, { message: lengthLessThanMessage })
  @MaxLength(100, { message: lengthGreaterThanMessage })
  @Column({ type: "varchar", length: 100 })
  hobby: string;

  @IsDefined({ message: isDefinedMessage })
  @IsDate({ message: isDateMessage })
  @MaxDate(new Date(), { message: maxDateMessage })
  @Column()
  data_nascimento: Date;

  @AfterLoad()
  @AfterUpdate()
  calcularIdade() {
    const hoje = dayjs(Date.now());
    const nasc = dayjs(this.data_nascimento);

    this.idade = hoje.diff(nasc, "year");
  }
}
