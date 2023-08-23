import { type Knex } from 'knex';

import { CommonTableColumns } from '#libs/enums/enums.js';

function createTableWithCommonColumns(
  tableName: string,
  createColumns: (table: Knex.CreateTableBuilder) => void,
): (knex: Knex) => Promise<void> {
  return async function (knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
      table.increments(CommonTableColumns.ID).primary();

      table
        .dateTime(CommonTableColumns.CREATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());

      table
        .dateTime(CommonTableColumns.UPDATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());

      createColumns(table);
    });
  };
}

function dropTableIfExists(tableName: string): (knex: Knex) => Promise<void> {
  return async function (knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(tableName);
  };
}

export { createTableWithCommonColumns, dropTableIfExists };
