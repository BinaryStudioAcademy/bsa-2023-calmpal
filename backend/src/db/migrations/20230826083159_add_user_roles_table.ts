import { type Knex } from 'knex';

const TABLE_NAME = 'user_roles';

const COLUMN_NAME = {
  ID: 'id',
  NAME: 'name',
  KEY: 'key',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
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
    table.string(COLUMN_NAME.NAME).notNullable();
    table.string(COLUMN_NAME.KEY).notNullable();
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
