import { BackButtonWrapper, Loader } from '~/libs/components/components.js';
import { MOBILE_DIMENSION } from '~/libs/constants/constants.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppSelector,
  useCallback,
  useMediaQuery,
} from '~/libs/hooks/hooks.js';

import { MeditationEntry } from './components/components.js';
import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  onSetIsSidebarShow: (value: boolean) => void;
};

const MeditationList: React.FC<Properties> = ({
  isSidebarShown,
  onSetIsSidebarShow,
}) => {
  const { meditationEntries, meditationEntriesDataStatus } = useAppSelector(
    ({ meditation }) => {
      return {
        meditationEntries: meditation.meditationEntries,
        meditationEntriesDataStatus: meditation.meditationEntriesDataStatus,
      };
    },
  );
  const isMobileDimension = useMediaQuery(MOBILE_DIMENSION);

  const handleBackButtonPress = useCallback(() => {
    onSetIsSidebarShow(true);
  }, [onSetIsSidebarShow]);

  if (meditationEntriesDataStatus === DataStatus.PENDING) {
    return !isSidebarShown && <Loader isOverflow />;
  }

  return (
    <div
      className={getValidClassNames(
        styles['container'],
        isSidebarShown && styles['hidden'],
      )}
    >
      <BackButtonWrapper
        onGoBack={handleBackButtonPress}
        isVisible={isMobileDimension}
      />
      <div className={styles['list']}>
        {meditationEntries.map((entry) => {
          return <MeditationEntry meditationEntry={entry} key={entry.id} />;
        })}
      </div>
    </div>
  );
};

export { MeditationList };
