import { type SetURLSearchParams } from 'react-router-dom';

import { BackButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
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
  const handleBackButtonPress = useCallback(() => {
    setIsSidebarShown({ sidebarMode: 'show' });
  }, [setIsSidebarShown]);

  return (
    <div
      className={getValidClassNames(
        styles['container'],
        isSidebarShown && styles['hidden'],
      )}
    >
      <BackButton onGoBack={handleBackButtonPress} />
      <div className={styles['list']}>
        {mockedEntries.map((entry) => {
          return <MeditationEntry meditationEntry={entry} key={entry.id} />;
        })}
      </div>
    </div>
  );
};

export { MeditationList };
