import { type Knex } from 'knex';

const TableName = {
  MEDITATION_ENTRIES: 'meditation_entries',
  MEDITATION_TOPICS: 'meditation_topics',
};

const ColumnName = {
  ID: 'id',
  TOPIC_ID: 'topic_id',
  MEDIA_URL: 'media_url',
  CONTENT_TYPE: 'content_type',
} as const;

type MeditationTopic = {
  id: number;
};

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.MEDITATION_ENTRIES, (table) => {
    table.integer(ColumnName.TOPIC_ID).nullable().alter();
    table.text(ColumnName.MEDIA_URL).notNullable().defaultTo('');
    table.string(ColumnName.CONTENT_TYPE).notNullable().defaultTo('');
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
    table.dropColumn(ColumnName.MEDIA_URL);
    table.dropColumn(ColumnName.CONTENT_TYPE);
  });
}

export { down, up };
