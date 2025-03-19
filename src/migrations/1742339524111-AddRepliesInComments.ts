import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRepliesInComments1742339524111 implements MigrationInterface {
  name = 'AddRepliesInComments1742339524111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Like" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" DROP CONSTRAINT "FK_3fb29200d14d53deb0d837d35a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Like" DROP CONSTRAINT "FK_51278e86acf3099776701f86201"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" DROP CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Post" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Like" ADD CONSTRAINT "FK_51278e86acf3099776701f86201" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" ADD CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" ADD CONSTRAINT "FK_3fb29200d14d53deb0d837d35a1" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Comment" DROP CONSTRAINT "FK_3fb29200d14d53deb0d837d35a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" DROP CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Like" DROP CONSTRAINT "FK_51278e86acf3099776701f86201"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Post" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" ADD CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Like" ADD CONSTRAINT "FK_51278e86acf3099776701f86201" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comment" ADD CONSTRAINT "FK_3fb29200d14d53deb0d837d35a1" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Like" ALTER COLUMN "id" DROP DEFAULT`,
    );
  }
}
