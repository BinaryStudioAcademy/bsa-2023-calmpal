import { AppRoute } from '#libs/enums/enums.js';
import { type MeditationEntryCreateForm } from '#packages/meditation/libs/types/types.js';

const TRACK_FIRST_INDEX = 0;
const TRACK_START_TIME = 0;
const FULL_PERCENTAGE = 100;
const TRACK_INCREMENT_INDEX = 1;
const TRACK_SKIP_SECONDS = 30;
const PROGRESS_BAR = '--player-progress';

const navigationItems = [{ name: 'Meditation', path: AppRoute.MEDITATION }];

const DEFAULT_MEDITATION_PAYLOAD: MeditationEntryCreateForm = {
  title: '',
  file: null,
};

const MOCKED_IMAGE = '../../src/assets/img/meditation-image-placeholder.jpg';

const mockedEntries = [
  {
    id: 1,
    title: 'Meditation for deep sleep',
    duration: '10 min',
  },
  {
    id: 2,
    title: 'Breathing meditation',
    duration: '5 min',
  },
  {
    id: 3,
    title: 'Meditation for relax',
    duration: '15 min',
  },
  {
    id: 4,
    title: 'Nature meditation',
    duration: '45 min',
  },
] as const;

const mockedPlaylist = [
  {
    id: 1,
    title: 'Meditation for deep sleep',
    purpose: 'Stress relief',
    src: 'http://traffic.libsyn.com/mindfulorg/winston-breathing-5mins.mp3',
    img: MOCKED_IMAGE,
  },
  {
    id: 2,
    title: 'Meditation for relaxing',
    purpose: 'Relax',
    src: 'http://traffic.libsyn.com/mindfulorg/SusanKaiserGreenland.mp3',
    img: MOCKED_IMAGE,
  },
  {
    id: 3,
    title: 'Meditation for breath practice',
    purpose: 'Breathing',
    src: 'http://traffic.libsyn.com/mindfulorg/LovingKindness.mp3',
    img: MOCKED_IMAGE,
  },
];

export {
  DEFAULT_MEDITATION_PAYLOAD,
  FULL_PERCENTAGE,
  mockedEntries,
  mockedPlaylist,
  navigationItems,
  PROGRESS_BAR,
  TRACK_FIRST_INDEX,
  TRACK_INCREMENT_INDEX,
  TRACK_SKIP_SECONDS,
  TRACK_START_TIME,
};
