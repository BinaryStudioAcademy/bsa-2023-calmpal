import { type Knex } from 'knex';

const TABLE_NAME = 'surveys';
const FOREIGN_TABLE_NAME = 'users';

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  PREFERENCES: 'preferences',
  FEELINGS: 'feelings',
  GOALS: 'goals',
  WORRIES: 'worries',
  MEDITATION_EXPERIENCE: 'meditation_experience',
  JOURNALING_EXPERIENCE: 'journaling_experience',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
} as const;

const RelationRule = {
  CASCADE: 'CASCADE',
} as const;

const POSTGRE_ARRAY_TYPE = 'varchar(1000)[]';
const POSTGRE_STRING_TYPE = 'varchar(255)';

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
      .specificType(ColumnName.PREFERENCES, POSTGRE_ARRAY_TYPE)
      .notNullable()
      .defaultTo('{}');
    table.specificType(ColumnName.FEELINGS, POSTGRE_STRING_TYPE);
    table.specificType(ColumnName.GOALS, POSTGRE_ARRAY_TYPE).defaultTo('{}');
    table.specificType(ColumnName.WORRIES, POSTGRE_ARRAY_TYPE).defaultTo('{}');
    table.specificType(ColumnName.MEDITATION_EXPERIENCE, POSTGRE_STRING_TYPE);
    table.specificType(ColumnName.JOURNALING_EXPERIENCE, POSTGRE_STRING_TYPE);
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
