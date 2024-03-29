import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryProductRelation1711657887743 implements MigrationInterface {
    name = 'CategoryProductRelation1711657887743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories_products_products" ("categoriesId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_df11914ffb834bdef013f7e660e" PRIMARY KEY ("categoriesId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dcbd028e554a81deb0a89cc3e8" ON "categories_products_products" ("categoriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b5a4476a30f188bf0d672b985b" ON "categories_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "categories" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories_products_products" ADD CONSTRAINT "FK_dcbd028e554a81deb0a89cc3e8a" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categories_products_products" ADD CONSTRAINT "FK_b5a4476a30f188bf0d672b985b7" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_products_products" DROP CONSTRAINT "FK_b5a4476a30f188bf0d672b985b7"`);
        await queryRunner.query(`ALTER TABLE "categories_products_products" DROP CONSTRAINT "FK_dcbd028e554a81deb0a89cc3e8a"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5a4476a30f188bf0d672b985b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcbd028e554a81deb0a89cc3e8"`);
        await queryRunner.query(`DROP TABLE "categories_products_products"`);
    }

}
