import { BackButton } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import {
  useCallback,
  useNavigate,
  useSearch,
  useSidebarState,
} from '#libs/hooks/hooks.js';

import { ChatLayout, ChatSidebar } from './components/components.js';
import styles from './styles.module.scss';

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { isSidebarShown, setIsSidebarShow } = useSidebarState();
  const { setFilter, filter } = useSearch();

  const handleBackButtonPress = useCallback(() => {
    navigate(AppRoute.CHATS);
    setIsSidebarShow(true);
  }, [setIsSidebarShow, navigate]);

  return (
    <>
      <ChatSidebar
        isSidebarShown={isSidebarShown}
        onSetIsSidebarShow={setIsSidebarShow}
        filter={filter}
        onSetFilter={setFilter}
      />
      <div
        className={getValidClassNames(
          styles['container'],
          isSidebarShown && styles['hide'],
        )}
      >
        <BackButton onGoBack={handleBackButtonPress} />
        <ChatLayout filter={filter} />
      </div>
    </>
  );
};

export { Chat };
