import { type Knex } from 'knex';

const TABLE_NAME = 'surveys';

const ColumnName = {
  FEELINGS: 'feelings',
  GOALS: 'goals',
  WORRIES: 'worries',
  MEDITATION_EXPERIENCE: 'meditation_experience',
  JOURNALING_EXPERIENCE: 'journaling_experience',
} as const;

const POSTGRE_ARRAY_TYPE = 'varchar(1000)[]';

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.specificType(ColumnName.FEELINGS, POSTGRE_ARRAY_TYPE);
    table.specificType(ColumnName.GOALS, POSTGRE_ARRAY_TYPE).defaultTo('{}');
    table.specificType(ColumnName.WORRIES, POSTGRE_ARRAY_TYPE).defaultTo('{}');
    table.string(ColumnName.MEDITATION_EXPERIENCE);
    table.string(ColumnName.JOURNALING_EXPERIENCE);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.FEELINGS);
    table.dropColumn(ColumnName.GOALS);
    table.dropColumn(ColumnName.WORRIES);
    table.dropColumn(ColumnName.MEDITATION_EXPERIENCE);
    table.dropColumn(ColumnName.JOURNALING_EXPERIENCE);
  });
}

export { down, up };
