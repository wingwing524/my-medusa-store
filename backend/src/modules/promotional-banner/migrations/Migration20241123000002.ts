import { Migration } from "@mikro-orm/migrations"

export class Migration20241123000002 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "promotional_banner" (
        "id" text NOT NULL,
        "message" text NOT NULL,
        "message_zh_tw" text,
        "start_date" timestamptz NOT NULL,
        "end_date" timestamptz NOT NULL,
        "is_active" boolean NOT NULL DEFAULT false,
        "background_color" text NOT NULL DEFAULT '#000000',
        "text_color" text NOT NULL DEFAULT '#FFFFFF',
        "link_url" text,
        "created_at" timestamptz NOT NULL DEFAULT now(),
        "updated_at" timestamptz NOT NULL DEFAULT now(),
        "deleted_at" timestamptz,
        CONSTRAINT "promotional_banner_pkey" PRIMARY KEY ("id")
      );
    `)

    this.addSql(`
      CREATE INDEX IF NOT EXISTS "IDX_promotional_banner_is_active" 
      ON "promotional_banner" ("is_active") 
      WHERE "deleted_at" IS NULL;
    `)

    this.addSql(`
      CREATE INDEX IF NOT EXISTS "IDX_promotional_banner_dates" 
      ON "promotional_banner" ("start_date", "end_date") 
      WHERE "deleted_at" IS NULL;
    `)
  }

  async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS "promotional_banner" CASCADE;')
  }
}
