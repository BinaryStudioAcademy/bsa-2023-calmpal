import { AudioPlayer } from './audio-player/audio-player.js';
import styles from './styles.module.scss';

type Meditation = {
  id: number;
  title: string;
  purpose: string;
  src: string;
  img: string;
};

type Properties = {
  meditation: Meditation;
};

const MeditationPlayer: React.FC<Properties> = ({ meditation }) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['meditation-player']}>
        <img src={meditation.img} alt="Meditation" width={355} height={355} />
        <p className={styles['title']}>{meditation.title}</p>
        <p className={styles['purpose']}>{meditation.purpose}</p>
        <AudioPlayer audio={{ src: '/audio/meditation.wav' }} />
      </div>
    </div>
  );
};

export { MeditationPlayer };
