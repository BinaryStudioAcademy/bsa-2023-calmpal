import { type Knex } from 'knex';

import { meditationEntries } from '#db/seed-data/meditation-entries.js';
import { DatabaseTableName } from '#libs/packages/database/database.js';

const seed = async (knex: Knex): Promise<void> => {
  await knex(DatabaseTableName.MEDITATION_ENTRIES).del();
  await knex(DatabaseTableName.MEDITATION_ENTRIES).insert(meditationEntries);
};

export { seed };
