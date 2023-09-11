import { Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/icon-color.enum.js';
import { getValidClassNames } from '#libs/helpers/get-valid-class-names.js';
import { useCallback } from '#libs/hooks/hooks.js';

import { mockedEntries } from '../libs/constants/constants.js';
import { MeditationEntry } from './meditation-entry/meditation-entry.js';
import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const MeditationList: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const handleButtonBackward = useCallback(() => {
    setIsSidebarShown(true);
  }, [setIsSidebarShown]);

  return (
    <div
      className={getValidClassNames(
        styles['container'],
        isSidebarShown && styles['hide'],
      )}
    >
      <button className={styles['backward']} onClick={handleButtonBackward}>
        <Icon name="back" color={IconColor.BLUE} />
      </button>
      <div className={styles['list']}>
        {mockedEntries.map((entry) => {
          return <MeditationEntry meditationEntry={entry} key={entry.id} />;
        })}
      </div>
    </div>
  );
};

export { MeditationList };
