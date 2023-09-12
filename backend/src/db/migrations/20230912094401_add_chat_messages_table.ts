import { type Knex } from 'knex';

const CHAT_MESSAGES_TABLE_NAME = 'chat_messages';
const USERS_TABLE_NAME = 'users';

const ColumnName = {
  ID: 'id',
  MESSAGE: 'message',
  SENDER_ID: 'sender_id',
  CHAT_ID: 'chat_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(CHAT_MESSAGES_TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.integer(ColumnName.SENDER_ID).notNullable();
    table
      .foreign(ColumnName.SENDER_ID)
      .references(ColumnName.ID)
      .inTable(USERS_TABLE_NAME)
      .onDelete(RelationRule.CASCADE);
    table.integer(ColumnName.CHAT_ID).notNullable();
    table.string(ColumnName.MESSAGE).notNullable();
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
  return knex.schema.dropTableIfExists(CHAT_MESSAGES_TABLE_NAME);
}

export { down, up };
