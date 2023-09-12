import { BackwardButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useSearchParams } from '#libs/hooks/hooks.js';

import { JournalSidebar } from './components/journal-sidebar/journal-sidebar.js';
import styles from './styles.module.scss';

const Journal: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParams();

  const isSidebarShownParameter =
    isSidebarShown.get('sidebarMode') === 'show' ||
    isSidebarShown.get('sidebarMode') === null;

  const handleButtonBackward = useCallback(() => {
    setIsSidebarShown({ sidebarMode: 'show' });
  }, [setIsSidebarShown]);

  return (
    <>
      <JournalSidebar
        isSidebarShown={isSidebarShownParameter}
        setIsSidebarShown={setIsSidebarShown}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShownParameter && styles['hide'],
        )}
      >
        <BackwardButton onGoBack={handleButtonBackward} />
        hi there
      </div>
    </>
  );
};

export { Journal };
