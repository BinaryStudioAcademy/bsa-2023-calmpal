import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';
import { Button, Modal } from '#libs/components/components.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
import { useAppDispatch, useCallback, useRef } from '#libs/hooks/hooks.js';
import { MeditationTimer } from '#pages/meditation/components/meditation-timer/meditation-timer.js';
import {
  DURATION_UNIT,
  MEDITATION_DURATION,
} from '#pages/meditation/libs/constants/constants.js';
import { actions as appActions } from '#slices/app/app.js';

import { type MeditationEntry } from '../../libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  meditationEntry: MeditationEntry;
};

const MeditationEntry: React.FC<Properties> = ({ meditationEntry }) => {
  const dispatch = useAppDispatch();
  const dialogReference = useRef<HTMLDialogElement>(null);

  const displayedDuration = `${
    MEDITATION_DURATION[
      meditationEntry.durationKey as keyof typeof MEDITATION_DURATION
    ]
  } ${DURATION_UNIT.MINUTES}`;

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
          <h1 className={styles['title']}>{meditationEntry.title}</h1>
          <span className={styles['duration']}>{displayedDuration}</span>
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
      <Modal title={meditationEntry.title} ref={dialogReference}>
        <MeditationTimer
          defaultDuration={meditationEntry.durationKey}
          onStartSession={handleStartSession}
        />
      </Modal>
    </div>
  );
};

export { MeditationEntry };
