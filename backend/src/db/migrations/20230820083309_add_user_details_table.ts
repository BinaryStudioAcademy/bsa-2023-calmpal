import { type Knex } from 'knex';

import { DatabaseTableName } from '#libs/packages/database/database.js';

const TABLE_NAME = 'user_details';

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  FULL_NAME: 'full_name',
  AVATAR_ID: 'avatar_id',
  SURVEY: 'survey',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.integer(ColumnName.USER_ID);
    table
      .foreign(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(DatabaseTableName.USERS)
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
    table.string(ColumnName.FULL_NAME).notNullable();
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
