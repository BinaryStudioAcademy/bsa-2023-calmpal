import { type Knex } from 'knex';

const TABLE_NAME = {
  USERS: 'users',
  USER_ROLES: 'user_roles',
};

const COLUMN_NAME = {
  ROLE_ID: 'role_id',
  ID: 'id',
};

const ROLE_MAPPING = {
  CHATBOT: 1,
  USER: 2,
};

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME.USERS, (table) => {
    table
      .integer(COLUMN_NAME.ROLE_ID)
      .unsigned()
      .notNullable()
      .defaultTo(ROLE_MAPPING.USER);
    table
      .foreign(COLUMN_NAME.ROLE_ID)
      .references(COLUMN_NAME.ID)
      .inTable(TABLE_NAME.USER_ROLES);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME.USERS, (table) => {
    table.dropColumn(COLUMN_NAME.ROLE_ID);
  });
}

export { down, up };
