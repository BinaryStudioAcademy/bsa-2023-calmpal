import { useSearchParams } from 'react-router-dom';

import { Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/icon-color.enum.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useEffect, useState } from '#libs/hooks/hooks.js';

import { JournalSidebar } from './components/journal-sidebar/journal-sidebar.js';
import styles from './styles.module.scss';

const Journal: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useState(true);
  const [searchParameters, setSearchParameters] = useSearchParams();
  useEffect(() => {
    searchParameters.get('isSidebarShownParam') !== null &&
      setIsSidebarShown(searchParameters.get('isSidebarShownParam') === 'true');
  }, []);

  useEffect(() => {
    setSearchParameters({ isSidebarShownParam: String(isSidebarShown) });
  }, [isSidebarShown, setSearchParameters]);

  const handleButtonBackward = useCallback(() => {
    setIsSidebarShown(true);
  }, [setIsSidebarShown]);

  return (
    <>
      <JournalSidebar
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown && styles['hide'],
        )}
      >
        <button className={styles['backward']} onClick={handleButtonBackward}>
          <Icon name="back" color={IconColor.BLUE} />
        </button>
        hi there
      </div>
    </>
  );
};

export { Journal };
