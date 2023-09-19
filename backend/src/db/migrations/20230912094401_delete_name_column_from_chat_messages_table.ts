import { type Knex } from 'knex';

const TABLE_NAME = 'chat_messages';

const COLUMN_NAME_TO_DELETE = 'name';

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME_TO_DELETE);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME_TO_DELETE).unique();
  });
}

export { down, up };
