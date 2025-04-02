import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedAtCommentAdded1743625306992 implements MigrationInterface {
    name = 'UpdatedAtCommentAdded1743625306992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" DROP COLUMN "updatedAt"`);
    }

}
