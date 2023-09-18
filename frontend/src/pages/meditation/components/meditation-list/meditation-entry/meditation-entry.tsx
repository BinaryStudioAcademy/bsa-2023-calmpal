import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';
import { Icon, Link } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { type MeditationEntryCreateResponseDto } from '#packages/meditation/meditation.js';
import { MOCKED_DURATION } from '#pages/meditation/libs/constants/constants.js';

import styles from './styles.module.scss';

type Properties = {
  meditationEntry: MeditationEntryCreateResponseDto;
};

const MeditationEntry: React.FC<Properties> = ({ meditationEntry }) => {
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
        <div className={styles['play-button']}>
          <Link to="/">
            <Icon name="play" color={IconColor.BLUE} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { MeditationEntry };
