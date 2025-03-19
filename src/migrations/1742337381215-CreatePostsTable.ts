import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostsTable1742337381215 implements MigrationInterface {
  name = 'CreatePostsTable1742337381215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Post" ("id" uuid NOT NULL, "title" character varying(100) NOT NULL, "description" character varying(2000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "userId" uuid, CONSTRAINT "PK_c4d3b3dcd73db0b0129ea829f9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Post" ADD CONSTRAINT "FK_97e81bcb59530bfb061e48aee6a" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Post" DROP CONSTRAINT "FK_97e81bcb59530bfb061e48aee6a"`,
    );
    await queryRunner.query(`DROP TABLE "Post"`);
  }
}
