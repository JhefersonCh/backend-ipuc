import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConfigurationTable1746484810652 implements MigrationInterface {
    name = 'UpdateConfigurationTable1746484810652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "title" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "description" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "additionalTitle" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "additionalDescription" character varying(2000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "enableRedirectToIpuc" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "logoUrl"`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "logoUrl" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "heroUrl"`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "heroUrl" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "heroUrl"`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "heroUrl" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "logoUrl"`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "logoUrl" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "enableRedirectToIpuc"`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "additionalDescription"`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "additionalTitle"`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "title"`);
    }

}
