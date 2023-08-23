import { type Knex } from 'knex';

const TABLE_NAME = 'chat_messages';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
  CHAT_ID: 'chat_id',
  SENDER_ID: 'sender_id',
  MESSAGE: 'message',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const ForeignTable = {
  CHATS: 'chats',
  USERS: 'users',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).unique().notNullable();
    table
      .integer(ColumnName.CHAT_ID)
      .notNullable()
      .references(ColumnName.ID)
      .inTable(ForeignTable.CHATS)
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer(ColumnName.SENDER_ID)
      .notNullable()
      .references(ColumnName.ID)
      .inTable(ForeignTable.USERS)
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.text(ColumnName.MESSAGE).notNullable();
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
