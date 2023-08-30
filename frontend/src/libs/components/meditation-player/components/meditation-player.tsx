import { useCallback, useState } from '#libs/hooks/hooks.js';
import { FIRST_INDEX, MOCKED_IMAGE } from '#libs/types/types.js';

import { AudioPlayer } from './audio-player/audio-player.js';
import styles from './styles.module.scss';

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

const MeditationPlayer: React.FC = () => {
  const [trackIndex, setTrackIndex] = useState<number>(FIRST_INDEX);
  const [currentTrack, setCurrentTrack] = useState(mockedPlaylist[trackIndex]);

  const handleTrackIndex = useCallback((index: number): void => {
    setTrackIndex(index);
    setCurrentTrack(mockedPlaylist[index]);
  }, []);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['meditation-player']}>
        <img
          className={styles['image']}
          src={currentTrack?.img}
          alt="Meditation"
          width={355}
          height={355}
        />
        <p className={styles['title']}>{currentTrack?.title}</p>
        <p className={styles['purpose']}>{currentTrack?.purpose}</p>
        <AudioPlayer
          src={currentTrack?.src ?? ''}
          trackIndex={trackIndex}
          onSetTrackIndex={handleTrackIndex}
          onSetCurrentTrack={setCurrentTrack}
          tracks={mockedPlaylist}
        />
      </div>
    </div>
  );
};

export { MeditationPlayer };
