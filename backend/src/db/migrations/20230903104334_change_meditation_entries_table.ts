import { type Knex } from 'knex';

const TABLE_NAME = 'meditation_entries';

const ColumnName = {
  ID: 'id',
  TOPIC_ID: 'topic_id',
  AUDIO_URL: 'audio_url',
} as const;

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.integer(ColumnName.TOPIC_ID).nullable().alter();
    table.string(ColumnName.AUDIO_URL).notNullable();
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.integer(ColumnName.TOPIC_ID).notNullable().alter();
    table.dropColumn(ColumnName.AUDIO_URL);
  });
}

export { down, up };
