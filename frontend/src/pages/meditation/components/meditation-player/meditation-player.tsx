import deafultMeditationImage from '#assets/img/meditation-image-placeholder.jpg';
import { AudioPlayer } from '#libs/components/components.js';
import { AppQueryStringKey } from '#libs/enums/enums.js';
import {
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useSearchParams,
  useState,
} from '#libs/hooks/hooks.js';
import { TRACK_FIRST_INDEX } from '#pages/meditation/libs/constants/constants.js';

import { TRACK_NOT_FOUND_INDEX } from './libs/constants/constants.js';
import styles from './styles.module.scss';

const MeditationPlayer: React.FC = () => {
  const { meditationEntries } = useAppSelector(({ meditation }) => {
    return {
      meditationEntries: meditation.meditationEntries,
    };
  });
  const { id: meditationEntryId } = useParams<{ id: string }>();
  const [searchParameters] = useSearchParams();
  const timerDuration = Number(
    searchParameters.get(AppQueryStringKey.TIMER_DURATION),
  );

  const [trackIndex, setTrackIndex] = useState(TRACK_FIRST_INDEX);

  useEffect(() => {
    const track = meditationEntries.find((entry) => {
      return entry.id === Number(meditationEntryId);
    });

    setTrackIndex(
      track ? meditationEntries.indexOf(track) : TRACK_NOT_FOUND_INDEX,
    );
  }, [meditationEntries, meditationEntryId]);

  const handleTrackIndex = useCallback((index: number): void => {
    setTrackIndex(index);
  }, []);

  const { name, mediaUrl } = meditationEntries[trackIndex] ?? {};

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
        <p className={styles['title']}>{name}</p>
        <AudioPlayer
          mediaUrl={mediaUrl as string}
          timerDuration={timerDuration}
          trackIndex={trackIndex}
          onSetTrackIndex={handleTrackIndex}
          tracksCount={meditationEntries.length}
        />
      </div>
    </div>
  );
};

export { MeditationPlayer };
