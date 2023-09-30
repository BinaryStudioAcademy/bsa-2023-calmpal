import deafultMeditationImage from '#assets/img/meditation-image-placeholder.jpg';
import { AudioPlayer, BackButtonWrapper } from '#libs/components/components.js';
import { MOBILE_DIMENSION } from '#libs/constants/constants.js';
import { AppQueryStringKey, AppRoute } from '#libs/enums/enums.js';
import {
  useAppSelector,
  useCallback,
  useEffect,
  useMediaQuery,
  useNavigate,
  useParams,
  useSearchParams,
  useSidebarState,
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
  const { setIsSidebarShow } = useSidebarState();
  const navigate = useNavigate();
  const timerDuration = Number(
    searchParameters.get(AppQueryStringKey.TIMER_DURATION),
  );

  const [trackIndex, setTrackIndex] = useState(TRACK_FIRST_INDEX);
  const isMobileDimension = useMediaQuery(MOBILE_DIMENSION);

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

  const handleBackButtonPress = useCallback(() => {
    navigate(AppRoute.MEDITATION);

    setIsSidebarShow(!isMobileDimension);
  }, [isMobileDimension, navigate, setIsSidebarShow]);

  const { name, mediaUrl } = meditationEntries[trackIndex] ?? {};

  return (
    <div className={styles['wrapper']}>
      <BackButtonWrapper onGoBack={handleBackButtonPress} isVisible />
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
