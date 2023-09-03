import { type Knex } from 'knex';

const TABLE_NAME = 'user_roles';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
  KEY: 'key',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const ROLES = [
  {
    id: 1,
    name: 'Chatbot',
    key: 'chatbot',
  },
  { id: 2, name: 'User', key: 'user' },
];

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).notNullable();
    table.string(ColumnName.KEY).checkIn(['chatbot', 'user']).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex(TABLE_NAME).insert(ROLES);
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
