import { type Knex } from 'knex';

const TableName = {
  MEDITATION_ENTRIES: 'meditation_entries',
  MEDITATION_TOPICS: 'meditation_topics',
};

const ColumnName = {
  ID: 'id',
  TOPIC_ID: 'topic_id',
  AUDIO_URL: 'audio_url',
} as const;

type MeditationTopic = {
  id: number;
};

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.MEDITATION_ENTRIES, (table) => {
    table.integer(ColumnName.TOPIC_ID).nullable().alter();
    table.text(ColumnName.AUDIO_URL).notNullable().defaultTo('');
  });
}

async function down(knex: Knex): Promise<void> {
  const topic = await knex(TableName.MEDITATION_TOPICS)
    .select<MeditationTopic>(ColumnName.ID)
    .first();

  await knex.schema.alterTable(TableName.MEDITATION_ENTRIES, (table) => {
    table
      .integer(ColumnName.TOPIC_ID)
      .notNullable()
      .defaultTo((topic as MeditationTopic).id)
      .alter();
    table.dropColumn(ColumnName.AUDIO_URL);
  });
}

export { down, up };
