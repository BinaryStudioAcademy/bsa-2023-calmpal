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

type UserRow = {
  id: number;
};

async function up(knex: Knex): Promise<void> {
  const userRole: UserRow = (await knex(TABLE_NAME.USER_ROLES)
    .where({ key: USER_ROLE_KEY })
    .select(COLUMN_NAME.ID)
    .first()) as UserRow;

  await knex.schema.alterTable(TABLE_NAME.USERS, (table) => {
    table
      .integer(COLUMN_NAME.ROLE_ID)
      .unsigned()
      .notNullable()
      .references(COLUMN_NAME.ID)
      .inTable(TABLE_NAME.USER_ROLES)
      .defaultTo(userRole.id);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME.USERS, (table) => {
    table.dropColumn(COLUMN_NAME.ROLE_ID);
  });
}

export { down, up };
