import { AudioPlayer } from '#libs/components/components.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';
import {
  mockedPlaylist,
  TRACK_FIRST_INDEX,
} from '#pages/meditation/libs/constants/constants.js';

import styles from './styles.module.scss';

const MeditationPlayer: React.FC = () => {
  const [trackIndex, setTrackIndex] = useState(TRACK_FIRST_INDEX);
  const [currentTrack, setCurrentTrack] = useState(mockedPlaylist[trackIndex]);

  const handleTrackIndex = useCallback((index: number): void => {
    setTrackIndex(index);
    setCurrentTrack(mockedPlaylist[index]);
  }, []);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['meditation-player']}>
        <div className={styles['image-wrapper']}>
          <img
            className={styles['image']}
            src={currentTrack?.img}
            alt="Meditation"
            width={355}
            height={355}
          />
        </div>
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
