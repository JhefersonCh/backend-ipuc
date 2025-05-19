import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedColumnInUserAvatarUrl1747653289099 implements MigrationInterface {
    name = 'AddedColumnInUserAvatarUrl1747653289099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "avatarUrl" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "avatarUrl"`);
    }

}
