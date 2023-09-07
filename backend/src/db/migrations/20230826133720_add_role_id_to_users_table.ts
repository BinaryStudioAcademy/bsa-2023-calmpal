import { type Knex } from 'knex';

const TABLE_NAME = {
  USERS: 'users',
  USER_ROLES: 'user_roles',
} as const;

const COLUMN_NAME = {
  ROLE_ID: 'role_id',
  ID: 'id',
} as const;

const USER_ROLE_KEY = 'user';

type UserRole = {
  id: number;
};

async function up(knex: Knex): Promise<void> {
  const userRole = await knex(TABLE_NAME.USER_ROLES)
    .select<UserRole>(COLUMN_NAME.ID)
    .where('key', USER_ROLE_KEY)
    .first();

  await knex.schema.alterTable(TABLE_NAME.USERS, (table) => {
    table
      .integer(COLUMN_NAME.ROLE_ID)
      .unsigned()
      .notNullable()
      .references(COLUMN_NAME.ID)
      .inTable(TABLE_NAME.USER_ROLES)
      .defaultTo((userRole as UserRole).id);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME.USERS, (table) => {
    table.dropColumn(COLUMN_NAME.ROLE_ID);
  });
}

export { down, up };
