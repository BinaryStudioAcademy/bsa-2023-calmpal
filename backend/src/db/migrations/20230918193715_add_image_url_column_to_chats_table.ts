import { type Knex } from 'knex';

const TABLE_NAME = 'chats';

const ColumnName = {
  IMAGE_URL: 'image_url',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(ColumnName.IMAGE_URL);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.IMAGE_URL);
  });
}

export { down, up };
