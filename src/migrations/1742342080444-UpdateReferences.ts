import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateReferences1742342080444 implements MigrationInterface {
    name = 'UpdateReferences1742342080444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_4c827119c9554affb8018d4da82"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7"`);
        await queryRunner.query(`ALTER TABLE "Comment" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Comment" ALTER COLUMN "postId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Post" DROP CONSTRAINT "FK_97e81bcb59530bfb061e48aee6a"`);
        await queryRunner.query(`ALTER TABLE "Post" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Like" DROP CONSTRAINT "FK_e1ac421f1e6a1da63df580c62e4"`);
        await queryRunner.query(`ALTER TABLE "Like" DROP CONSTRAINT "FK_51278e86acf3099776701f86201"`);
        await queryRunner.query(`ALTER TABLE "Like" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Like" ALTER COLUMN "postId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_4c827119c9554affb8018d4da82" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Post" ADD CONSTRAINT "FK_97e81bcb59530bfb061e48aee6a" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Like" ADD CONSTRAINT "FK_e1ac421f1e6a1da63df580c62e4" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Like" ADD CONSTRAINT "FK_51278e86acf3099776701f86201" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Like" DROP CONSTRAINT "FK_51278e86acf3099776701f86201"`);
        await queryRunner.query(`ALTER TABLE "Like" DROP CONSTRAINT "FK_e1ac421f1e6a1da63df580c62e4"`);
        await queryRunner.query(`ALTER TABLE "Post" DROP CONSTRAINT "FK_97e81bcb59530bfb061e48aee6a"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_4c827119c9554affb8018d4da82"`);
        await queryRunner.query(`ALTER TABLE "Like" ALTER COLUMN "postId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Like" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Like" ADD CONSTRAINT "FK_51278e86acf3099776701f86201" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Like" ADD CONSTRAINT "FK_e1ac421f1e6a1da63df580c62e4" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Post" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Post" ADD CONSTRAINT "FK_97e81bcb59530bfb061e48aee6a" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Comment" ALTER COLUMN "postId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Comment" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_fb770b565e79f3a4a2ecef894a7" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_4c827119c9554affb8018d4da82" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
