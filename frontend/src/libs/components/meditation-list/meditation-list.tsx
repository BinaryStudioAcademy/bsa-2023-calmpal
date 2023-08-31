import { MeditationTrack } from './meditation-item/meditation-item.js';
import styles from './styles.module.scss';

const tracks = [
  {
    id: 1,
    title: 'Meditation for deep sleep',
    duration: '10 min',
    link: '',
    imageLink: '',
  },
  {
    id: 2,
    title: 'Breathing meditation',
    duration: '5 min',
    link: '',
    imageLink: '',
  },
  {
    id: 3,
    title: 'Meditation for relax',
    duration: '15 min',
    link: '',
    imageLink: '',
  },
  {
    id: 4,
    title: 'Nature meditation',
    duration: '45 min',
    link: '',
    imageLink: '',
  },
];

const MeditationList: React.FC = () => {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['list']}>
          {tracks.map((track) => {
            return <MeditationTrack track={track} key={track.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export { MeditationList };
