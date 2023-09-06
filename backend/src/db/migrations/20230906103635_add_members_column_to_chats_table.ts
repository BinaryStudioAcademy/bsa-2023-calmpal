import { type Knex } from 'knex';

const TABLE_NAME = 'chats';

const ColumnName = {
  MEMBERS: 'members',
} as const;

const ColumnType = {
  INTEGER_ARRAY: 'integer[]',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table
      .specificType(ColumnName.MEMBERS, ColumnType.INTEGER_ARRAY)
      .defaultTo('{}');
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.MEMBERS);
  });
}

export { down, up };
