import { BackwardButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useSearchParams } from '#libs/hooks/hooks.js';

import { UserProfileSidebar } from './components/components.js';
import styles from './styles.module.scss';

const UserProfile: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParams({
    isSidebarShownParam: 'true',
  });

  const handleButtonBackward = useCallback(() => {
    setIsSidebarShown({ isSidebarShownParam: 'true' });
  }, [setIsSidebarShown]);

  const isSidebarShownParameter =
    isSidebarShown.get('isSidebarShownParam') === 'true' ||
    isSidebarShown.get('isSidebarShownParam') === null;

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
