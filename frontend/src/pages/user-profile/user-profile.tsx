import { BackwardButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useSearchParams } from '#libs/hooks/hooks.js';

import { UserProfileSidebar } from './components/components.js';
import styles from './styles.module.scss';

const UserProfile: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParams();

  const handleButtonBackward = useCallback(() => {
    setIsSidebarShown({ sidebarMode: 'show' });
  }, [setIsSidebarShown]);

  const isSidebarShownParameter =
    isSidebarShown.get('sidebarMode') === 'show' ||
    isSidebarShown.get('sidebarMode') === null;

  return (
    <>
      <UserProfileSidebar
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

export { UserProfile };
