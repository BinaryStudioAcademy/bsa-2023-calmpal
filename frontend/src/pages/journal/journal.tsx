import { useSearchParams } from 'react-router-dom';

import { BackwardButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback } from '#libs/hooks/hooks.js';

import { JournalSidebar } from './components/journal-sidebar/journal-sidebar.js';
import styles from './styles.module.scss';

const Journal: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParams({
    isSidebarShownParam: 'true',
  });

  const handleButtonBackward = useCallback(() => {
    setIsSidebarShown({ isSidebarShownParam: 'true' });
  }, [setIsSidebarShown]);

  return (
    <>
      <JournalSidebar
        isSidebarShown={isSidebarShown.get('isSidebarShownParam') === 'true'}
        setIsSidebarShown={setIsSidebarShown}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown.get('isSidebarShownParam') === 'true' &&
            styles['hide'],
        )}
      >
        <BackwardButton handleButtonBackward={handleButtonBackward} />
        hi there
      </div>
    </>
  );
};

export { Journal };
