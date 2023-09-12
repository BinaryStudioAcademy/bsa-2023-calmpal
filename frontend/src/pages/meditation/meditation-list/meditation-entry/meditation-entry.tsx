import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';
import { Button, MeditationTimer, Modal } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import { type MeditationEntry } from '../../libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  meditationEntry: MeditationEntry;
};

const MeditationEntry: React.FC<Properties> = ({ meditationEntry }) => {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);

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
          <span className={styles['duration']}>{meditationEntry.duration}</span>
        </div>
        <Button
          style="play-button"
          onClick={handlePlayClick}
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
          defaultDuration={meditationEntry.duration}
        />
      </Modal>
    </div>
  );
};

export { MeditationEntry };
