import { Migration } from '@mikro-orm/migrations';

export class Migration20241123000001 extends Migration {

  async up(): Promise<void> {
    // Drop the old unique index on slug only
    this.addSql('drop index if exists "IDX_page_slug_unique";');
    
    // Add locale column with default value 'en'
    this.addSql('alter table "page" add column if not exists "locale" text check ("locale" in (\'en\', \'zh-TW\')) not null default \'en\';');
    
    // Create new composite unique index on slug and locale
    this.addSql('create unique index if not exists "IDX_page_slug_locale_unique" on "page" ("slug", "locale") where deleted_at is null;');
  }

  async down(): Promise<void> {
    // Drop the composite index
    this.addSql('drop index if exists "IDX_page_slug_locale_unique";');
    
    // Recreate the old unique index on slug only
    this.addSql('create unique index if not exists "IDX_page_slug_unique" on "page" ("slug") where deleted_at is null;');
    
    // Remove locale column
    this.addSql('alter table "page" drop column if exists "locale";');
  }

}
