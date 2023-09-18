import { type Knex } from 'knex';

const TABLE_NAME = 'meditation_entries';

const ColumnName = {
  NAME: 'name',
  MEDIA_URL: 'media_url',
  CONTENT_TYPE: 'content_type',
} as const;

async function up(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del();

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.text(ColumnName.NAME).notNullable();
    table.text(ColumnName.MEDIA_URL).notNullable();
    table.string(ColumnName.CONTENT_TYPE).notNullable();
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.NAME);
    table.dropColumn(ColumnName.MEDIA_URL);
    table.dropColumn(ColumnName.CONTENT_TYPE);
  });
}

export { down, up };
