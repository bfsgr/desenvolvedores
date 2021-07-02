import {MigrationInterface, QueryRunner} from "typeorm";

export class GenModel1625124589704 implements MigrationInterface {
    name = 'GenModel1625124589704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "desenvolvedor_sexo_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`CREATE TABLE "desenvolvedor" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "sexo" "desenvolvedor_sexo_enum" NOT NULL, "hobby" character varying NOT NULL, "data_nascimento" TIMESTAMP NOT NULL, CONSTRAINT "PK_caed89da6970e6d035f4bacea87" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "desenvolvedor"`);
        await queryRunner.query(`DROP TYPE "desenvolvedor_sexo_enum"`);
    }

}
