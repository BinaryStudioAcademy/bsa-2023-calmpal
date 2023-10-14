import { BackButtonWrapper } from '~/libs/components/components.js';
import { MOBILE_DIMENSION } from '~/libs/constants/constants.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useMediaQuery,
  useSidebarState,
} from '~/libs/hooks/hooks.js';
import { ProfileSettings } from '~/pages/profile-settings/profile-settings.js';

import { UserProfileSidebar } from './components/components.js';
import styles from './styles.module.scss';

const UserProfile: React.FC = () => {
  const { isSidebarShown, setIsSidebarShow } = useSidebarState();
  const isMobileDimension = useMediaQuery(MOBILE_DIMENSION);

  const handleBackButtonPress = useCallback(() => {
    setIsSidebarShow(true);
  }, [setIsSidebarShow]);

  return (
    <>
      <UserProfileSidebar
        isSidebarShown={isSidebarShown}
        onSetIsSidebarShow={setIsSidebarShow}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown && styles['hide'],
        )}
      >
        <BackButtonWrapper
          onGoBack={handleBackButtonPress}
          isVisible={isMobileDimension}
        />
        <ProfileSettings />
      </div>
    </>
  );
};

export { UserProfile };
