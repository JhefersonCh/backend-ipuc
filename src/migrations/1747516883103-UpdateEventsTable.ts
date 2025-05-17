import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEventsTable1747516883103 implements MigrationInterface {
    name = 'UpdateEventsTable1747516883103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event" RENAME COLUMN "name" TO "title"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "title" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "description" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "imageUrl" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "publicId"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "publicId" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "publicId"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "publicId" character varying`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "imageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event" RENAME COLUMN "title" TO "name"`);
    }

}
