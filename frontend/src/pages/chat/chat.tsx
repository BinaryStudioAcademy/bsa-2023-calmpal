import { useSearchParams } from 'react-router-dom';

import { BackwardButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback } from '#libs/hooks/hooks.js';

import { ChatSidebar } from './components/components.js';
import styles from './styles.module.scss';

const Chats: React.FC = () => {
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
        <BackwardButton handleButtonBackward={handleButtonBackward} />
        hi there
      </div>
    </>
  );
};

export { Chats };
