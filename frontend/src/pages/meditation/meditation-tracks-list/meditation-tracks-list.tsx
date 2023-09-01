import { MeditationTrack } from './meditation-track/meditation-track.js';
import { mockedTracks } from './mock/mocked-tracks.js';
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
