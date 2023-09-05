import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';
import { Icon, Link } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';

import { type MeditationEntry } from '../../libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  meditationEntry: MeditationEntry;
};

const MeditationEntry: React.FC<Properties> = ({ meditationEntry }) => {
  return (
    <div className={styles['track']}>
      <img
        src={meditationListPlaceholder}
        alt="Meditation track background"
        className={styles['background-image']}
      />
      <div className={styles['content']}>
        <div className={styles['info']}>
          <h1 className={styles['title']}>{meditationEntry.title}</h1>
          <p className={styles['duration']}>{meditationEntry.duration}</p>
        </div>
        <Link to="/" className={styles['play-button'] as string}>
          <Icon name="play" color={IconColor.BLUE} />
        </Link>
      </div>
    </div>
  );
};

export { MeditationEntry };
