import { BackButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useSidebarState } from '#libs/hooks/hooks.js';

import { UserProfileSidebar } from './components/components.js';
import styles from './styles.module.scss';

const UserProfile: React.FC = () => {
  const { isSidebarShown, setIsSidebarShow } = useSidebarState();

  const handleBackButtonPress = useCallback(() => {
    setIsSidebarShow(true);
  }, [setIsSidebarShow]);

  return (
    <>
      <UserProfileSidebar
        isSidebarShown={isSidebarShown}
        setIsSidebarShow={setIsSidebarShow}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown && styles['hide'],
        )}
      >
        <BackButton onGoBack={handleBackButtonPress} />
        hi there
      </div>
    </>
  );
};

export { UserProfile };
