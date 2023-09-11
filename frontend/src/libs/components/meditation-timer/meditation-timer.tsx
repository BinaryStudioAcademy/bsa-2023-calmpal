import { useCallback, useState } from '#libs/hooks/hooks.js';

import { DURATION_UNIT, MEDITATION_DURATION } from './libs/constants.js';

type TimerProperties = {
  onClose: () => void;
};

const Timer: React.FC<TimerProperties> = ({ onClose }) => {
  const [selectedDuration, setSelectedDuration] = useState('');

  const handleClick = useCallback((duration: string) => {
    return () => {
      setSelectedDuration(duration);
    };
  }, []);

  return (
    <div className="timer">
      <p className="title">Choose Your Duration</p>
      <div className="durations">
        {Object.keys(MEDITATION_DURATION).map((duration) => {
          return (
            <button
              key={duration}
              className={`duration-item ${
                selectedDuration === duration ? 'active' : ''
              }`}
              onClick={handleClick(duration)}
            >
              <span
                className={`duration ${
                  selectedDuration === duration ? 'active-text' : ''
                }`}
              >
                {
                  MEDITATION_DURATION[
                    duration as keyof typeof MEDITATION_DURATION
                  ]
                }
              </span>
              <span
                className={`duration-unit ${
                  selectedDuration === duration ? 'active-text' : ''
                }`}
              >
                {DURATION_UNIT.MINUTES}
              </span>
            </button>
          );
        })}
      </div>
      <button className="start-button" onClick={onClose}>
        Start Session
      </button>
    </div>
  );
};

export { Timer };
