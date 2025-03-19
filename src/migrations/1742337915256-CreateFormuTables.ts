import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFormuTables1742337915256 implements MigrationInterface {
    name = 'CreateFormuTables1742337915256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Like" ("id" uuid NOT NULL, "userId" uuid, "postId" uuid, CONSTRAINT "PK_20ede1755cb694ecf15674c8ba1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Comment" ("id" uuid NOT NULL, "content" character varying(2000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_fe8d6bf0fcb531dfa75f3fd5bdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Like" ADD CONSTRAINT "FK_e1ac421f1e6a1da63df580c62e4" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Like" ADD CONSTRAINT "FK_51278e86acf3099776701f86201" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_4c827119c9554affb8018d4da82" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_4c827119c9554affb8018d4da82"`);
        await queryRunner.query(`ALTER TABLE "Like" DROP CONSTRAINT "FK_51278e86acf3099776701f86201"`);
        await queryRunner.query(`ALTER TABLE "Like" DROP CONSTRAINT "FK_e1ac421f1e6a1da63df580c62e4"`);
        await queryRunner.query(`DROP TABLE "Comment"`);
        await queryRunner.query(`DROP TABLE "Like"`);
    }

}
