import meditationListPlaceholder from '#assets/img/meditation-list-placeholder.jpg';
import { Icon, Link } from '#libs/components/components.js';

import { type Entry } from '../../libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  track: Entry;
};

const MeditationEntry: React.FC<Properties> = ({ track }) => {
  return (
    <div className={styles['track']}>
      <img
        src={meditationListPlaceholder}
        alt="Meditation track background"
        className={styles['background-image']}
      />
      <div className={styles['content']}>
        <div className={styles['info']}>
          <h1 className={styles['title']}>{track.title}</h1>
          <p className={styles['duration']}>{track.duration}</p>
        </div>
        <Link to="/" className={styles['play-button'] as string}>
          <Icon name="play" />
        </Link>
      </div>
    </div>
  );
};

export { MeditationEntry };
