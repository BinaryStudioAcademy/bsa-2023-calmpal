import { type Track } from '#libs/types/types';

const TITLE_LINE_COUNT = 1;
const TRACK_START_INDEX = 0;
const mockedPlaylist: Track[] = [
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
  {
    id: '3',
    title: 'Meditation for breath practice',
    artist: 'Breathing',
    url: 'http://traffic.libsyn.com/mindfulorg/LovingKindness.mp3',
    artwork: '',
  },
];

export { mockedPlaylist, TITLE_LINE_COUNT, TRACK_START_INDEX };
