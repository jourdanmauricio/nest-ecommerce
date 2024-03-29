import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCustomerPkAutogenerate1711576861831 implements MigrationInterface {
    name = 'UserCustomerPkAutogenerate1711576861831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_id_seq" OWNED BY "users"."id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('"users_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "customers_id_seq" OWNED BY "customers"."id"`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "id" SET DEFAULT nextval('"customers_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de"`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "customers_id_seq"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c6c520dfb9a4d6dd749e73b13de" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
    }

}
