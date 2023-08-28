const name = 'Meditation for deep sleep';
const link = '#link';

const tracks = [
  { id: 1, name, duration: '10min', link },
  { id: 2, name, duration: '9min', link },
  { id: 3, name, duration: '1min', link },
  { id: 4, name, duration: '5min', link },
  { id: 5, name, duration: '4min', link },
  { id: 6, name, duration: '6min', link },
  { id: 7, name, duration: '7min', link },
  { id: 8, name, duration: '13min', link },
  { id: 9, name, duration: '20min', link },
];

const firstIndex = 0;

const MeditationList: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="list">
          <div className="item">{tracks[firstIndex]?.name}</div>
        </div>
      </div>
    </>
  );
};

export { MeditationList };
