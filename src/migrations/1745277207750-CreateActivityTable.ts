import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActivityTable1745277207750 implements MigrationInterface {
    name = 'CreateActivityTable1745277207750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "image" character varying(255) NOT NULL, CONSTRAINT "PK_3603ebbaf4b4db169e33bc148a4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Activity"`);
    }

}
