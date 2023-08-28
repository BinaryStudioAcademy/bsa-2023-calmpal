import { type Knex } from 'knex';

const TABLE_NAME = 'surveys';
const FOREIGN_TABLE_NAME = 'users';

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  PREFERENCES: 'preferences',
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
      .unique()
      .references(ColumnName.ID)
      .inTable(FOREIGN_TABLE_NAME)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.CASCADE)
      .notNullable();
    table
      .specificType(ColumnName.PREFERENCES, 'varchar(1000)[]')
      .notNullable()
      .defaultTo('{}');
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
