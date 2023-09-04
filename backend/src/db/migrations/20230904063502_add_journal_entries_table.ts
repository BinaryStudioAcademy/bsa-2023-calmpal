import { type Knex } from 'knex';

const TABLE_NAME = 'journal_entries';

const ColumnName = {
  ID: 'id',
  TITLE: 'title',
  TEXT: 'text',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.TITLE).notNullable();
    table.text(ColumnName.TEXT).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
