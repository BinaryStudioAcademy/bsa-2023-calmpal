import { mockedTracks } from '../libs/constants/constants.js';
import { MeditationTrack } from './meditation-track/meditation-track.js';
import styles from './styles.module.scss';

const MeditationTracksList: React.FC = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['list']}>
        {mockedTracks.map((track) => {
          return <MeditationTrack track={track} key={track.id} />;
        })}
      </div>
    </div>
  );
};

export { MeditationTracksList };
