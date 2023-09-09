import { type Track } from '#libs/types/types';

const TITLE_LINE_COUNT = 1;
const TRACK_START_INDEX = 0;

const MOCKED_PLAYLIST: Track[] = [
  {
    id: '1',
    title: 'Meditation for deep sleep',
    artist: 'Stress relief',
    url: 'http://traffic.libsyn.com/mindfulorg/winston-breathing-5mins.mp3',
    artwork: '',
  },
  {
    id: '2',
    title: 'Meditation for relaxing',
    artist: 'Relax',
    url: 'http://traffic.libsyn.com/mindfulorg/SusanKaiserGreenland.mp3',
    artwork: '',
  },
];

export { MOCKED_PLAYLIST, TITLE_LINE_COUNT, TRACK_START_INDEX };
