import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';
import { Button, Loader, Modal } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { getFormattedTime } from '#libs/helpers/helpers.js';
import {
  useAppDispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from '#libs/hooks/hooks.js';
import { type MeditationEntryCreateResponseDto } from '#packages/meditation/meditation.js';
import { actions as appActions } from '#slices/app/app.slice.js';

import { MeditationTimer } from '../../../meditation-timer/meditation-timer.js';
import { generateMeditationEntryLink } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  meditationEntry: MeditationEntryCreateResponseDto;
};

const MeditationEntry: React.FC<Properties> = ({ meditationEntry }) => {
  const dispatch = useAppDispatch();
  const dialogReference = useRef<HTMLDialogElement>(null);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  useEffect(() => {
    const audio = new Audio(meditationEntry.mediaUrl);

    const onMetadataLoaded = (): void => {
      setAudioDuration(audio.duration);
    };

    audio.addEventListener('loadedmetadata', onMetadataLoaded);

    return () => {
      audio.removeEventListener('loadedmetadata', onMetadataLoaded);
    };
  }, [meditationEntry.mediaUrl]);

  const handlePlayClick = useCallback(() => {
    dialogReference.current?.showModal();
  }, [dialogReference]);

  const handleModalClose = useCallback(() => {
    dialogReference.current?.close();
  }, [dialogReference]);

  const handleStartSession = useCallback(
    (timerDuration: number) => {
      const redirectTo = generateMeditationEntryLink({
        timerDuration,
        meditationEntryId: meditationEntry.id,
      });

      dispatch(appActions.navigate(redirectTo));
      handleModalClose();
    },
    [meditationEntry.id, dispatch, handleModalClose],
  );

  return (
    <div className={styles['track']}>
      <img
        src={meditationListPlaceholder}
        alt="Meditation entry"
        className={styles['background-image']}
      />
      <div className={styles['content']}>
        <div className={styles['info']}>
          <h1 className={styles['title']}>{meditationEntry.name}</h1>
          <span className={styles['duration']}>
            {audioDuration
              ? `${getFormattedTime(audioDuration, false)} min`
              : 'Loading...'}
          </span>
        </div>
        <Button
          style="play-button"
          onClick={handlePlayClick}
          label="Play meditation"
          isLabelVisuallyHidden
          iconName="play"
          iconColor={IconColor.BLUE}
        />
      </div>
      <Modal title={meditationEntry.name} ref={dialogReference}>
        {audioDuration ? (
          <MeditationTimer
            defaultDuration={audioDuration}
            onStartSession={handleStartSession}
          />
        ) : (
          <div className={styles['loader-wrapper']}>
            <Loader isOverflow />
          </div>
        )}
      </Modal>
    </div>
  );
};

export { MeditationEntry };
