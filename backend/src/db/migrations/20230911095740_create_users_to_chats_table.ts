import { type Knex } from 'knex';

const TABLE_NAME = 'users_to_chats';

const ForeignTableName = {
  USERS: 'users',
  CHATS: 'chats',
} as const;

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  CHAT_ID: 'chat_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(ForeignTableName.USERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE)
      .notNullable();
    table
      .integer(ColumnName.CHAT_ID)
      .references(ColumnName.ID)
      .inTable(ForeignTableName.CHATS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE)
      .notNullable();
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
