import { ContentType } from 'shared/build/index.js';

const AUDIO_CONTENT_TYPE = ContentType.MPEG;
const now = new Date();

const mockedMeditationEntries = [
  {
    id: 1,
    name: 'Atwined',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Atwined.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 2,
    name: 'Blue Lagoon',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Blue%20Lagoon.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 3,
    name: 'Calm Dawn',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Calm%20Dawn.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 4,
    name: 'Dispersion (Meditation)',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Dispersion%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 5,
    name: 'Initiation',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Initiation.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 6,
    name: 'Joyvision',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Joyvision.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 7,
    name: 'Lunar Tides (Meditation)',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Lunar%20Tides%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 8,
    name: 'Moonbeam Showers (Meditation)',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Moonbeam%20Showers%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 9,
    name: 'Moonlit Glade (Meditation)',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Moonlit%20Glade%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 10,
    name: 'Night Voyage',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Night%20Voyage.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 11,
    name: 'Sapphire Glow',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Sapphire%20Glow.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 12,
    name: 'Solasta',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Solasta.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 13,
    name: 'Stargazing (Meditation)',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Stargazing%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 14,
    name: 'Sweven',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Sweven.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 15,
    name: 'Weightless (Meditation)',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Weightless%20(Meditation).mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 16,
    name: 'Your Reverie',
    mediaUrl:
      'https://calmpal-storage-development.s3.eu-west-1.amazonaws.com/meditations/Your%20Reverie.mp3',
    contentType: AUDIO_CONTENT_TYPE,
    createdAt: now,
    updatedAt: now,
  },
];

export { mockedMeditationEntries };
