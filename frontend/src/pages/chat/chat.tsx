import { BackwardButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useSearchParams } from '#libs/hooks/hooks.js';

import { ChatSidebar } from './components/components.js';
import styles from './styles.module.scss';

const Chats: React.FC = () => {
  const [isSidebarShown, setIsSidebarShown] = useSearchParams();

  const handleButtonBackward = useCallback(() => {
    setIsSidebarShown({ sidebarMode: 'show' });
  }, [setIsSidebarShown]);

  const isSidebarShownParameter =
    isSidebarShown.get('sidebarMode') === 'show' ||
    isSidebarShown.get('sidebarMode') === null;

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
        <BackwardButton onGoBack={handleButtonBackward} />
        hi there
      </div>
    </>
  );
};

export { Chats };
