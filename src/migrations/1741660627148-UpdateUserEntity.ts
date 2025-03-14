import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1741660627148 implements MigrationInterface {
    name = 'UpdateUserEntity1741660627148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "fullName"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "firstName" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "lastName" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "role" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD "username" character varying(25) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "fullName" character varying(255) NOT NULL`);
    }

}
