import { mockedTracks } from '../libs/constants/constants.js';
import { MeditationEntry } from './meditation-entry/meditation-entry.js';
import styles from './styles.module.scss';

const MeditationEntriesList: React.FC = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['list']}>
        {mockedTracks.map((track) => {
          return <MeditationEntry track={track} key={track.id} />;
        })}
      </div>
    </div>
  );
};

export { MeditationEntriesList };
