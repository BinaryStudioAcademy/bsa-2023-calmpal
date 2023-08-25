import { type Knex } from 'knex';

const USER_DETAILS_TABLE_NAME = 'user_details';
const USERS_TABLE_NAME = 'users';

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  FULL_NAME: 'full_name',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(USER_DETAILS_TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.integer(ColumnName.USER_ID);
    table
      .foreign(ColumnName.USER_ID)
      .references(ColumnName.ID)
      .inTable(USERS_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE);
    table.string(ColumnName.FULL_NAME).notNullable();
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
  return knex.schema.dropTableIfExists(USER_DETAILS_TABLE_NAME);
}

export { down, up };
