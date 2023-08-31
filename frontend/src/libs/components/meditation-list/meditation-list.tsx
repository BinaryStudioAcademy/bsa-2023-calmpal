import { MeditationTrack } from './meditation-item/meditation-item.js';
import styles from './styles.module.scss';

const mockedImageLink = './images/track-background-336x480.jpg';

const mockedTracks = [
  {
    id: 1,
    title: 'Meditation for deep sleep',
    duration: '10 min',
    link: '',
    imageLink: mockedImageLink,
  },
  {
    id: 2,
    title: 'Breathing meditation',
    duration: '5 min',
    link: '',
    imageLink: mockedImageLink,
  },
  {
    id: 3,
    title: 'Meditation for relax',
    duration: '15 min',
    link: '',
    imageLink: mockedImageLink,
  },
  {
    id: 4,
    title: 'Nature meditation',
    duration: '45 min',
    link: '',
    imageLink: mockedImageLink,
  },
];

const MeditationList: React.FC = () => {
  return (
    <>
      <div className={styles['container']}>
        <div className={styles['list']}>
          {mockedTracks.map((track) => {
            return <MeditationTrack track={track} key={track.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export { MeditationList };
