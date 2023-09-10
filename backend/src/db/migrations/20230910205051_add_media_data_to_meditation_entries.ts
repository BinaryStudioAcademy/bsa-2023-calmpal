import { type Knex } from 'knex';

const TABLE_NAME = 'meditation_entries';

const ColumnName = {
  ID: 'id',
  MEDIA_URL: 'media_url',
  CONTENT_TYPE: 'content_type',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.text(ColumnName.MEDIA_URL).notNullable().defaultTo('');
    table.string(ColumnName.CONTENT_TYPE).notNullable().defaultTo('');
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.MEDIA_URL);
    table.dropColumn(ColumnName.CONTENT_TYPE);
  });
}

export { down, up };
