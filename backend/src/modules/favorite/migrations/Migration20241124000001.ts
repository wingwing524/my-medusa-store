import { Migration } from "@mikro-orm/migrations"

export class Migration20241124000001 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `CREATE TABLE IF NOT EXISTS "favorite" (
        "id" text NOT NULL,
        "customer_id" text NOT NULL,
        "product_id" text NOT NULL,
        "variant_id" text,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
      );`
    )

    // Add index on customer_id for fast lookups
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_favorite_customer_id" ON "favorite" ("customer_id") WHERE deleted_at IS NULL;`
    )

    // Add composite index on customer_id and product_id to prevent duplicates
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_favorite_customer_product" ON "favorite" ("customer_id", "product_id") WHERE deleted_at IS NULL;`
    )

    // Add index on product_id
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_favorite_product_id" ON "favorite" ("product_id") WHERE deleted_at IS NULL;`
    )
  }

  async down(): Promise<void> {
    this.addSql(`DROP TABLE IF EXISTS "favorite" CASCADE;`)
  }
}
