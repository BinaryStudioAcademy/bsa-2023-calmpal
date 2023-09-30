import { type Knex } from 'knex';

const TABLE_NAME = 'users';
const ColumnName = {
  DELETED_AT: 'deleted_at',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dateTime(ColumnName.DELETED_AT);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.DELETED_AT);
  });
}

export { down, up };
