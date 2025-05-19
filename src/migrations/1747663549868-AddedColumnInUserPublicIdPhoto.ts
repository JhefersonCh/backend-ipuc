import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedColumnInUserPublicIdPhoto1747663549868 implements MigrationInterface {
    name = 'AddedColumnInUserPublicIdPhoto1747663549868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "publicId" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "publicId"`);
    }

}
