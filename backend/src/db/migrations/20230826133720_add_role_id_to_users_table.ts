import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const REFERENCE_COLUMN = 'role_id';

const ROLE_MAPPING = {
  CHATBOT: 1,
  USER: 2,
};

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table
      .integer(REFERENCE_COLUMN)
      .unsigned()
      .notNullable()
      .defaultTo(ROLE_MAPPING.USER);
    table.foreign(REFERENCE_COLUMN).references('id').inTable('user_roles');
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(REFERENCE_COLUMN);
  });
}

export { down, up };
