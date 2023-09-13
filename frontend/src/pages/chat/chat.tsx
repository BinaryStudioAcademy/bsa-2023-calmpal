import { BackButton } from '#libs/components/components.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useCallback,
  useSearchParams,
  useSidebarShow,
} from '#libs/hooks/hooks.js';

import {
  // ChatLayout,
  ChatSidebar,
} from './components/components.js';
import styles from './styles.module.scss';

const Chat: React.FC = () => {
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
      {/* <main className={styles['view-port']}>
      <aside className={styles['chat-panel']}>
        <ChatSidebar />
      </aside>
      <section className={styles['chat-container']}>
        <ChatLayout />
      </section>
    </main> */}
    </>
  );
};

export { Chat };
