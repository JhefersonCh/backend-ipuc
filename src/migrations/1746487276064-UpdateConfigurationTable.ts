import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConfigurationTable1746487276064 implements MigrationInterface {
    name = 'UpdateConfigurationTable1746487276064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Configuration" ADD "appName" character varying(100) NOT NULL DEFAULT 'Iglesia Pentecostal Unida de Colombia - Sede Cuarta.'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "appName"`);
    }

}
