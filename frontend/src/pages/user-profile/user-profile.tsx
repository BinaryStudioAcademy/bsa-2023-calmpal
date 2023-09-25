import { BackButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useSidebarState } from '#libs/hooks/hooks.js';
import { ProfileSettings } from '#pages/profile-settings/profile-settings.js';

import { UserProfileSidebar } from './components/components.js';
import styles from './styles.module.scss';

const UserProfile: React.FC = () => {
  const { isSidebarShown, setIsSidebarShown } = useSidebarState();

  const handleBackButtonPress = useCallback(() => {
    setIsSidebarShown(true);
  }, [setIsSidebarShown]);

  return (
    <>
      <UserProfileSidebar
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown && styles['hide'],
        )}
      >
        <BackButton onGoBack={handleBackButtonPress} />
        <ProfileSettings />
      </div>
    </>
  );
};

export { UserProfile };
