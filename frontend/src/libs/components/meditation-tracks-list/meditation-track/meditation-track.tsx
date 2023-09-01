import { Icon, Link } from '#libs/components/components.js';

import styles from './styles.module.scss';

type Track = {
  id: number;
  title: string;
  duration: string;
  image: string;
};

type Properties = {
  track: Track;
};

const MeditationTrack: React.FC<Properties> = ({ track }) => {
  return (
    <div className={styles['track']}>
      <img
        src={track.image}
        alt="Meditation track background"
        className={styles['background-image']}
      />
      <div className={styles['content']}>
        <div className={styles['info']}>
          <h1 className={styles['title']}>{track.title}</h1>
          <p className={styles['duration']}>{track.duration}</p>
        </div>
        <Link to="/" className={styles['play-button'] ?? ''}>
          <Icon name="meditation" />
        </Link>
      </div>
    </div>
  );
};

export { MeditationTrack };
