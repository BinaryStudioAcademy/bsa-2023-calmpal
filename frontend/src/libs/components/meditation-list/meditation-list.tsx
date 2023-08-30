import { MeditationTrack } from './meditation-item/meditation-item.js';
import styles from './styles.module.scss';

const track = {
  id: 1,
  title: 'Meditation for deep sleep',
  duration: '10min',
  link: '',
};

const MeditationList: React.FC = () => {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['list']}>
          <MeditationTrack track={track} />
          <MeditationTrack track={track} />
          <MeditationTrack track={track} />
          <MeditationTrack track={track} />
          <MeditationTrack track={track} />
        </div>
      </div>
    </>
  );
};

export { MeditationList };
