import { type Knex } from 'knex';

const TABLE_NAME = 'meditation_entries';

const ColumnName = {
  TOPIC_ID: 'topic_id',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.integer(ColumnName.TOPIC_ID).nullable().alter();
  });
}

async function down(knex: Knex): Promise<void> {
  await knex(TABLE_NAME).del().where(ColumnName.TOPIC_ID, null);

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.integer(ColumnName.TOPIC_ID).notNullable().alter();
  });
}

export { down, up };
