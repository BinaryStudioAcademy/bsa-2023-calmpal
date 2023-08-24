import { type Knex } from 'knex';

const TABLE_NAME = 'users';

const ColumnName = {
  IS_SURVEY_COMPLETED: 'is_survey_completed',
};

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.boolean(ColumnName.IS_SURVEY_COMPLETED).defaultTo(false);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.IS_SURVEY_COMPLETED);
  });
}

export { down, up };
