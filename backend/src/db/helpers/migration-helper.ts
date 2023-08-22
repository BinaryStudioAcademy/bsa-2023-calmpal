import { type Knex } from 'knex';

import { CommonColumns } from '#libs/enums/enums.js';

function createTableWithCommonColumns(
  tableName: string,
  createColumns: (table: Knex.CreateTableBuilder) => void,
): (knex: Knex) => Promise<void> {
  return async function (knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
      table.increments(CommonColumns.ID).primary();

      table
        .dateTime(CommonColumns.CREATED_AT)
        .notNullable()
        .defaultTo(knex.fn.now());

      table
        .dateTime(CommonColumns.UPDATED_AT)
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
