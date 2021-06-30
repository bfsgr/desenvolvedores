import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Desenvolvedor {
  @PrimaryColumn()
  readonly id: number;

  @Column({ type: "varchar", length: 255 })
  nome: string;

  @Column()
  idade: number;

  @Column()
  hobby: string;

  @Column()
  data_nascimento: Date;
}
