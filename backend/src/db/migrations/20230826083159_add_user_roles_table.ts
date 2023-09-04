import { type Knex } from 'knex';

const TABLE_NAME = 'user_roles';

const COLUMN_NAME = {
  ID: 'id',
  NAME: 'name',
  KEY: 'key',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const USER_NAMES = {
  CHATBOT: 'Chatbot',
  USER: 'User',
} as const;

const USER_ROLES = {
  CHATBOT: 'chatbot',
  USER: 'user',
} as const;

const ROLES = [
  {
    name: 'Chatbot',
    key: 'chatbot',
  },
  { name: 'User', key: 'user' },
];

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(COLUMN_NAME.ID).primary();
    table.enum(COLUMN_NAME.NAME, Object.values(USER_NAMES));
    table.enum(COLUMN_NAME.KEY, Object.values(USER_ROLES));
    table
      .dateTime(COLUMN_NAME.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(COLUMN_NAME.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex(TABLE_NAME).insert(ROLES);
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
