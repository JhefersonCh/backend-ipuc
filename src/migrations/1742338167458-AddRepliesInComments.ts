import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRepliesInComments1742338167458 implements MigrationInterface {
    name = 'AddRepliesInComments1742338167458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" ADD "parentId" uuid`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_3fb29200d14d53deb0d837d35a1" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_3fb29200d14d53deb0d837d35a1"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP COLUMN "parentId"`);
    }

}
