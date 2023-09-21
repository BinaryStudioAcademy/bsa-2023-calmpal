import deafultMeditationImage from '#assets/img/meditation-image-placeholder.jpg';
import { AudioPlayer } from '#libs/components/components.js';
import { useCallback, useParams, useState } from '#libs/hooks/hooks.js';
import { TRACK_FIRST_INDEX } from '#pages/meditation/libs/constants/constants.js';

import { mockedMeditationEntries } from '../meditation-list/mocked-meditation-entries.js';
import styles from './styles.module.scss';

const MeditationPlayer: React.FC = () => {
  const { id } = useParams<{ id: string; duration: string }>();
  const parsedId = Number(id);

  const foundTrack = mockedMeditationEntries.find((entry) => {
    return entry.id === parsedId;
  });

  const [currentTrack, setCurrentTrack] = useState(
    foundTrack ?? mockedMeditationEntries[TRACK_FIRST_INDEX],
  );
  const [trackIndex, setTrackIndex] = useState(
    foundTrack
      ? mockedMeditationEntries.indexOf(foundTrack)
      : TRACK_FIRST_INDEX,
  );

  const handleTrackIndex = useCallback((index: number): void => {
    setTrackIndex(index);
    setCurrentTrack(mockedMeditationEntries[index]);
  }, []);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['meditation-player']}>
        <div className={styles['image-wrapper']}>
          <img
            className={styles['image']}
            src={deafultMeditationImage}
            alt="Meditation"
            width={355}
            height={355}
          />
        </div>
        <p className={styles['title']}>{currentTrack?.name}</p>
        <AudioPlayer
          src={currentTrack?.mediaUrl ?? ''}
          trackIndex={trackIndex}
          onSetTrackIndex={handleTrackIndex}
          onSetCurrentTrack={setCurrentTrack}
          tracks={mockedMeditationEntries}
        />
      </div>
    </div>
  );
};

export { MeditationPlayer };
