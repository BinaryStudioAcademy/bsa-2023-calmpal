import { type Knex } from 'knex';

const TABLE_NAME = 'chat_messages';

const ColumnName = {
  NAME: 'name',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.NAME);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(ColumnName.NAME).unique().notNullable();
  });
}

export { down, up };
