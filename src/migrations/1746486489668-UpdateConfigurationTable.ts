import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConfigurationTable1746486489668 implements MigrationInterface {
    name = 'UpdateConfigurationTable1746486489668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "mission" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "vision" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "ubicationUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "ubicationCoordinates" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "enableRedirectToGoogleMaps" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "enableRedirectToGoogleMaps" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "ubicationCoordinates" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "ubicationUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "vision" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Configuration" ALTER COLUMN "mission" DROP NOT NULL`);
    }

}
