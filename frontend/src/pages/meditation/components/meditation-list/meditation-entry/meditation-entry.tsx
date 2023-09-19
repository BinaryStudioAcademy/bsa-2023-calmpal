import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';
import { Button, Modal } from '#libs/components/components.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
import { useAppDispatch, useCallback, useRef } from '#libs/hooks/hooks.js';
import { type MeditationEntryCreateResponseDto } from '#packages/meditation/meditation.js';
import { MOCKED_DURATION } from '#pages/meditation/libs/constants/constants.js';
import { actions as appActions } from '#slices/app/app.slice.js';

import { MEDITATION_DURATION } from '../../meditation-timer/libs/constants.js';
import { MeditationTimer } from '../../meditation-timer/meditation-timer.js';
import styles from './styles.module.scss';

type Properties = {
  meditationEntry: MeditationEntryCreateResponseDto;
};

const MeditationEntry: React.FC<Properties> = ({ meditationEntry }) => {
  const dispatch = useAppDispatch();
  const dialogReference = useRef<HTMLDialogElement>(null);

  const handlePlayClick = useCallback(() => {
    dialogReference.current?.showModal();
  }, [dialogReference]);

  const handleModalClose = useCallback(() => {
    dialogReference.current?.close();
  }, [dialogReference]);

  const handleStartSession = useCallback(() => {
    dispatch(
      appActions.navigate(`${AppRoute.MEDITATION}/${meditationEntry.id}`),
    );
    handleModalClose();
  }, [meditationEntry.id, dispatch, handleModalClose]);

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
          <span className={styles['duration']}>{MOCKED_DURATION}</span>
        </div>
        <Button
          style="play-button"
          onClick={handlePlayClick}
          label="Play meditation"
          isLabelVisuallyHidden={true}
          iconName="play"
          iconColor={IconColor.BLUE}
        />
      </div>
      <Modal title={meditationEntry.name} ref={dialogReference}>
        <MeditationTimer
          defaultDuration={MEDITATION_DURATION.SHORT}
          onStartSession={handleStartSession}
        />
      </Modal>
    </div>
  );
};

export { MeditationEntry };
