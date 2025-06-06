import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEventTable1747502170332 implements MigrationInterface {
  name = 'CreateEventTable1747502170332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User" ADD "resetToken" character varying(200)`,
    );
    await queryRunner.query(
      `ALTER TABLE "User" ADD "resetTokenExpiry" TIMESTAMP`,
    );
    await queryRunner.query(
      `CREATE TABLE "Event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "date" date NOT NULL, "activityId" uuid NOT NULL, "imageUrl" character varying, "publicId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_894abf6d0c8562b398c717414d6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "resetToken"`);
    await queryRunner.query(
      `ALTER TABLE "User" DROP COLUMN "resetTokenExpiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Event" ADD CONSTRAINT "FK_b4f8df5f856465b8c8925fe3a13" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User" DROP COLUMN "resetTokenExpiry"`,
    );
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "resetToken"`);
    await queryRunner.query(
      `ALTER TABLE "Event" DROP CONSTRAINT "FK_b4f8df5f856465b8c8925fe3a13"`,
    );
    await queryRunner.query(
      `ALTER TABLE "User" ADD "resetTokenExpiry" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "User" ADD "resetToken" character varying(200)`,
    );
    await queryRunner.query(`DROP TABLE "Event"`);
  }
}
