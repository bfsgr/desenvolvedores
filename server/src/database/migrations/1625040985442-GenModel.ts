import {MigrationInterface, QueryRunner} from "typeorm";

export class GenModel1625040985442 implements MigrationInterface {
    name = 'GenModel1625040985442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "desenvolvedor" ("id" integer NOT NULL, "nome" character varying(255) NOT NULL, "idade" integer NOT NULL, "hobby" character varying NOT NULL, "data_nascimento" TIMESTAMP NOT NULL, CONSTRAINT "PK_caed89da6970e6d035f4bacea87" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "desenvolvedor"`);
    }

}
