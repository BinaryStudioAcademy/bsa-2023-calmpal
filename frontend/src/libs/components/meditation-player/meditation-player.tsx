import { useCallback, useState } from '#libs/hooks/hooks.js';
import { FIRST_INDEX } from '#libs/types/types.js';

import { AudioPlayer } from './audio-player/audio-player.js';
import { mockedPlaylist } from './constants/constants.js';
import styles from './styles.module.scss';

const MeditationPlayer: React.FC = () => {
  const [trackIndex, setTrackIndex] = useState(FIRST_INDEX);
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
