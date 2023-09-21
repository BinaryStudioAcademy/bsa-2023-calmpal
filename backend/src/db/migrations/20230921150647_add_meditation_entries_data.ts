import { type Knex } from 'knex';

const DATABASE_TABLE_NAME = 'meditation_entries';

const AUDIO_CONTENT_TYPE = 'audio/mpeg';

const MEDITATION_ENTRIES = [
  {
    name: 'Atwined',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Atwined.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Blue Lagoon',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Blue%20Lagoon.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Calm Dawn',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Calm%20Dawn.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Dispersion (Meditation)',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Dispersion%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Initiation',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Initiation.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Joyvision',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Joyvision.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Lunar Tides (Meditation)',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Lunar%20Tides%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Moonbeam Showers (Meditation)',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Moonbeam%20Showers%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Moonlit Glade (Meditation)',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Moonlit%20Glade%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Night Voyage',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Night%20Voyage.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Sapphire Glow',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Sapphire%20Glow.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Solasta',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Solasta.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Stargazing (Meditation)',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Stargazing%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Sweven',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Sweven.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Weightless (Meditation)',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Weightless%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    name: 'Your Reverie',

    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Your%20Reverie.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
];

const up = async (knex: Knex): Promise<void> => {
  await knex(DATABASE_TABLE_NAME).insert(MEDITATION_ENTRIES);
};

const down = async (knex: Knex): Promise<void> => {
  await knex(DATABASE_TABLE_NAME).del();
};

export { down, up };
