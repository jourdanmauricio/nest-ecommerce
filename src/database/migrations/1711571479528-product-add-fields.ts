import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductAddFields1711571479528 implements MigrationInterface {
  name = 'ProductAddFields1711571479528';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createAt"`);
  }
}
