const FIRST_INDEX = 0;
const START_TIME = 0;
const FULL_PERCENTAGE = 100;
const STEP = 1;
const SKIP_STEP = 30;
const PROGRESS_BAR = '--player-progress';

const MOCKED_IMAGE = '../../src/assets/img/meditation-image-placeholder.jpg';

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
  FIRST_INDEX,
  FULL_PERCENTAGE,
  mockedPlaylist,
  PROGRESS_BAR,
  SKIP_STEP,
  START_TIME,
  STEP,
};
