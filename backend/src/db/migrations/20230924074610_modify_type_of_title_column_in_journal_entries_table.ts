import { type Knex } from 'knex';

const TABLE_NAME = 'journal_entries';
const CHARS_LIMIT = 300;

const ColumnName = {
  TITLE: 'title',
} as const;

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(ColumnName.TITLE, CHARS_LIMIT).notNullable().alter();
  });
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(ColumnName.TITLE).notNullable();
  });
};

export { down, up };
