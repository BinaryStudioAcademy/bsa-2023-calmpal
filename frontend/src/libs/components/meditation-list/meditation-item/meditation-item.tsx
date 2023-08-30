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
        <img src="./play-button-60x60.png" alt="" className={styles['img']} />
      </div>
    </div>
  );
};

export { MeditationTrack };
