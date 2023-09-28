import { getAudioDurationInSeconds } from 'get-audio-duration';
import { type Knex } from 'knex';

const TABLE_NAME = 'meditation_entries';

const ColumnName = {
  DURATION: 'duration',
  MEDIA_URL: 'media_url',
} as const;

const ZERO_DURATION = 0;

const ContentType = {
  MPEG: 'audio/mpeg',
} as const;

type ValueOf<T> = T[keyof T];

type MeditationEntry = {
  id: number;
  name: string;
  mediaUrl: string;
  contentType: ValueOf<typeof ContentType>;
  duration?: number;
};

const up = async (knex: Knex): Promise<void> => {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.float(ColumnName.DURATION).notNullable().defaultTo(ZERO_DURATION);
  });

  const meditationEntries = await knex<MeditationEntry>(TABLE_NAME).select();
  for (const meditationEntry of meditationEntries) {
    const duration = await getAudioDurationInSeconds(meditationEntry.mediaUrl);

    await knex(TABLE_NAME)
      .where({ id: meditationEntry.id })
      .update({ duration });
  }
};

const down = (knex: Knex): Promise<void> => {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.DURATION);
  });
};

export { down, up };
