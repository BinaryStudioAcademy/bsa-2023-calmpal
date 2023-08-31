import { Icon } from '#libs/components/components.js';
import { Link } from '#libs/components/components.js';
import { IconNameToIcon } from '#libs/enums/enums.js';

import styles from './styles.module.scss';

type Track = {
  id: number;
  title: string;
  duration: string;
  link: string;
  imageLink: string;
};

type Properties = {
  track: Track;
};

const MeditationTrack: React.FC<Properties> = ({ track }) => {
  return (
    <div className={styles['track']}>
      <img
        src="./images/background-image.jpg"
        alt="background"
        className={styles['background-image']}
      />
      <div className={styles['content']}>
        <div className={styles['info']}>
          <h1 className={styles['title']}>{track.title}</h1>
          <p className={styles['duration']}>{track.duration}</p>
        </div>
        <Link to="/" className={styles['play-button'] ?? ''}>
          <Icon name={IconNameToIcon.PLAY} />
        </Link>
      </div>
    </div>
  );
};

export { MeditationTrack };
