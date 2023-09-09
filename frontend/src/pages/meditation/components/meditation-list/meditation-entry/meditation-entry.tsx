import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';
import { Icon, Link } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';

import styles from './styles.module.scss';

type Properties = {
  meditationEntry: {
    id: number;
    title: string;
    duration: string;
  };
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
          <h1 className={styles['title']}>{meditationEntry.title}</h1>
          <span className={styles['duration']}>{meditationEntry.duration}</span>
        </div>
        <Link to="/" className={styles['play-button'] as string}>
          <Icon name="play" color={IconColor.BLUE} />
        </Link>
      </div>
    </div>
  );
};

export { MeditationEntry };
