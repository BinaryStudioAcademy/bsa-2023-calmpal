import { type Knex } from 'knex';

import { meditationEntries } from '#db/seed-data/meditation-entries.js';
import { DatabaseTableName } from '#libs/packages/database/database.js';

const TOPICS = [
  {
    name: 'Meditation',
  },
];

const MEDITATION_TOPICS_NAME = 'Meditation';

type MeditationTopic = {
  id: number;
};

const seed = async (knex: Knex): Promise<void> => {
  await knex(DatabaseTableName.MEDITATION_TOPICS).insert(TOPICS);

  const meditationTopicById = await knex(DatabaseTableName.MEDITATION_TOPICS)
    .where<MeditationTopic>('name', MEDITATION_TOPICS_NAME)
    .first();

  const meditationEntriesWithTopicId = meditationEntries.map((entry) => {
    return {
      ...entry,
      topic_id: (meditationTopicById as MeditationTopic).id,
    };
  });

  await knex(DatabaseTableName.MEDITATION_ENTRIES).del();
  await knex(DatabaseTableName.MEDITATION_ENTRIES).insert(
    meditationEntriesWithTopicId,
  );
};

export { seed };
