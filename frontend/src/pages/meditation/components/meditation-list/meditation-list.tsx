import { BackButton, Loader } from '#libs/components/components.js';
import { DataStatus } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useAppSelector, useCallback } from '#libs/hooks/hooks.js';

import { MeditationEntry } from './meditation-entry/meditation-entry.js';
import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: (value: boolean) => void;
};

const MeditationList: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const { meditationEntries, meditationEntriesDataStatus } = useAppSelector(
    ({ meditation }) => {
      return {
        meditationEntries: meditation.meditationEntries,
        meditationEntriesDataStatus: meditation.meditationEntriesDataStatus,
      };
    },
  );

  const handleBackButtonPress = useCallback(() => {
    setIsSidebarShown(true);
  }, [setIsSidebarShown]);

  if (meditationEntriesDataStatus === DataStatus.PENDING) {
    return !isSidebarShown && <Loader />;
  }

  return (
    <div
      className={getValidClassNames(
        styles['container'],
        isSidebarShown && styles['hidden'],
      )}
    >
      <BackButton onGoBack={handleBackButtonPress} />
      <div className={styles['list']}>
        {meditationEntries.map((entry) => {
          return <MeditationEntry meditationEntry={entry} key={entry.id} />;
        })}
      </div>
    </div>
  );
};

export { MeditationList };
