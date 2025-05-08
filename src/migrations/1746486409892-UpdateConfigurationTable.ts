import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConfigurationTable1746486409892 implements MigrationInterface {
    name = 'UpdateConfigurationTable1746486409892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "mission" character varying(2000)`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "vision" character varying(2000)`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "ubicationUrl" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "ubicationCoordinates" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "enableRedirectToGoogleMaps" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "enableRedirectToGoogleMaps"`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "ubicationCoordinates"`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "ubicationUrl"`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "vision"`);
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "mission"`);
    }

}
