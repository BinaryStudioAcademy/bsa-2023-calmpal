import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';
import { Button, MeditationTimer, Modal } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';
import {
  DURATION_UNIT,
  MEDITATION_DURATION,
} from '#pages/meditation/libs/constants/constants.js';

import { type MeditationEntry } from '../../libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  meditationEntry: MeditationEntry;
};

const MeditationEntry: React.FC<Properties> = ({ meditationEntry }) => {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);

  const displayedDuration = `${
    MEDITATION_DURATION[
      meditationEntry.durationKey as keyof typeof MEDITATION_DURATION
    ]
  } ${DURATION_UNIT.MINUTES}`;

  const handlePlayClick = useCallback(() => {
    setIsModalDisplayed(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalDisplayed(false);
  }, []);

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
      <Modal
        isDisplayed={isModalDisplayed}
        title={meditationEntry.title}
        onClose={handleModalClose}
      >
        <MeditationTimer
          onClose={handleModalClose}
          defaultDuration={meditationEntry.durationKey}
        />
      </Modal>
    </div>
  );
};

export { MeditationEntry };
