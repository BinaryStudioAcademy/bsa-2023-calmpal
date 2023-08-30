import { Link } from '#libs/components/components.js';
import { Icon } from '#libs/components/icon/icon.js';

import styles from './styles.module.scss';

type Track = {
  id: number;
  title: string;
  duration: string;
  link: string;
};

type Properties = {
  track: Track;
};

const MeditationTrack: React.FC<Properties> = ({ track }) => {
  return (
    <div className={styles['item']}>
      <div className={styles['content']}>
        <div className={styles['info']}>
          <h1 className={styles['title']}>{track.title}</h1>
          <p className={styles['p']}>{track.duration}</p>
        </div>

        <Link to="/" className={'.block'}>
          <Icon name="play" />
        </Link>
      </div>
    </div>
  );
};

export { MeditationTrack };
