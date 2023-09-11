import { type SetURLSearchParams } from 'react-router-dom';

import { BackwardButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import { useCallback } from '#libs/hooks/hooks.js';

import { mockedEntries } from '../libs/constants/constants.js';
import { MeditationEntry } from './meditation-entry/meditation-entry.js';
import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: SetURLSearchParams;
};

const MeditationList: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const handleButtonBackward = useCallback(() => {
    setIsSidebarShown({ isSidebarShownParam: 'true' });
  }, [setIsSidebarShown]);

  return (
    <div
      className={getValidClassNames(
        styles['container'],
        isSidebarShown && styles['hide'],
      )}
    >
      <BackwardButton handleButtonBackward={handleButtonBackward} />
      <div className={styles['list']}>
        {mockedEntries.map((entry) => {
          return <MeditationEntry meditationEntry={entry} key={entry.id} />;
        })}
      </div>
    </div>
  );
};

export { MeditationList };
