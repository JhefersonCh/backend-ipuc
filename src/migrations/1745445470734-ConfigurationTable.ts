import { MigrationInterface, QueryRunner } from "typeorm";

export class ConfigurationTable1745445470734 implements MigrationInterface {
    name = 'ConfigurationTable1745445470734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Configuration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logoUrl" character varying(50) NOT NULL, "logoPublicId" character varying(50) NOT NULL, "heroUrl" character varying(50) NOT NULL, "heroPublicId" character varying(50) NOT NULL, CONSTRAINT "PK_1401688c0da48c67a1e76f77767" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Activity" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "Activity" ADD "imageUrl" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Activity" ADD "publicId" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Activity" DROP COLUMN "publicId"`);
        await queryRunner.query(`ALTER TABLE "Activity" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "Activity" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE "Configuration"`);
    }

}
