import { type Knex } from 'knex';

const TABLE_NAME = 'chats';

const ColumnName = {
  NAME: 'name',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropUnique([ColumnName.NAME]);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.unique([ColumnName.NAME]);
  });
}

export { down, up };
