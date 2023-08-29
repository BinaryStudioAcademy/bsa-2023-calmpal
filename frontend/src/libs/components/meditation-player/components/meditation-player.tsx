import { useCallback, useState } from '#libs/hooks/hooks.js';

import { FIRST_INDEX } from '../libs/constants.js';
import { type Meditation } from '../libs/types.js';
import { AudioPlayer } from './audio-player/audio-player.js';
import styles from './styles.module.scss';

type Properties = {
  playlist: Meditation[];
};

const MeditationPlayer: React.FC<Properties> = ({ playlist }) => {
  const [trackIndex, setTrackIndex] = useState<number>(FIRST_INDEX);
  const [currentTrack, setCurrentTrack] = useState(playlist[trackIndex]);

  const handleTrackIndex = useCallback(
    (index: number): void => {
      setTrackIndex(index);
      setCurrentTrack(playlist[index]);
    },
    [playlist],
  );

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
          tracks={playlist}
        />
      </div>
    </div>
  );
};

export { MeditationPlayer };
