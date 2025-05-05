import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateConfigurationTable1746485167524
  implements MigrationInterface
{
  name = 'UpdateConfigurationTable1746485167524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Configuration" DROP CONSTRAINT "PK_1401688c0da48c67a1e76f77767"`,
    );
    await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "Configuration" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Configuration" ADD CONSTRAINT "PK_1401688c0da48c67a1e76f77767" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Configuration" DROP CONSTRAINT "PK_1401688c0da48c67a1e76f77767"`,
    );
    await queryRunner.query(`ALTER TABLE "Configuration" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "Configuration" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "Configuration" ADD CONSTRAINT "PK_1401688c0da48c67a1e76f77767" PRIMARY KEY ("id")`,
    );
  }
}
