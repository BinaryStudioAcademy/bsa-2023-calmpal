import { BackButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback } from '#libs/hooks/hooks.js';

import { MEDITATION_ENTRIES } from '../libs/constants/constants.js';
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
  const handleBackButtonPress = useCallback(() => {
    setIsSidebarShown(true);
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
        {MEDITATION_ENTRIES.map((entry) => {
          return <MeditationEntry meditationEntry={entry} key={entry.id} />;
        })}
      </div>
    </div>
  );
};

export { MeditationList };
