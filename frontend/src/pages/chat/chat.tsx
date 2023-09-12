import { BackButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useCallback,
  useSearchParams,
  useSidebarShow,
} from '#libs/hooks/hooks.js';

import { ChatSidebar } from './components/components.js';
import styles from './styles.module.scss';

const Chats: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParams();

  const handleBackButtonPress = useCallback(() => {
    setIsSidebarShown({ sidebarMode: 'show' });
  }, [setIsSidebarShown]);

  const isSidebarShownParameter = useSidebarShow(
    isSidebarShown.get('sidebarMode'),
  );

  return (
    <>
      <ChatSidebar
        isSidebarShown={isSidebarShownParameter}
        setIsSidebarShown={setIsSidebarShown}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShownParameter && styles['hide'],
        )}
      >
        <BackButton onGoBack={handleBackButtonPress} />
        hi there
      </div>
    </>
  );
};

export { Chats };
