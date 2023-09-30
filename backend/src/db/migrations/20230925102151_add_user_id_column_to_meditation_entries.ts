import { type Knex } from 'knex';

const TABLE_NAME = 'meditation_entries';

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
} as const;

const ForeignTable = {
  USERS: 'users',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(ForeignTable.USERS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.USER_ID);
  });
}

export { down, up };
