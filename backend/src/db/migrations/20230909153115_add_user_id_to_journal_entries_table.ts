import { type Knex } from 'knex';

const TABLE_NAME = 'journal_entries';
const FOREIGN_TABLE_NAME = 'users';

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table
      .integer(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(FOREIGN_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE)
      .notNullable();
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.USER_ID);
  });
}

export { down, up };
