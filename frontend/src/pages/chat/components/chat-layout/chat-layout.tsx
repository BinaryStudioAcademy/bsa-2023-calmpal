import { RouterOutlet } from '#libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useParams,
} from '#libs/hooks/hooks.js';
import { ChatFooter, ChatHeader } from '#pages/chat/components/components.js';
import { EMPTY_ARRAY_LENGTH } from '#pages/chat/libs/constants/constants.js';
import { actions as chatActions } from '#slices/chats/chats.js';

import styles from './styles.module.scss';

const ChatLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentChatMessages } = useAppSelector(({ chats }) => {
    return {
      currentChatMessages: chats.currentChatMessages,
    };
  });

  const handleSend = useCallback((): void => {
    if (currentChatMessages.length === EMPTY_ARRAY_LENGTH) {
      void dispatch(chatActions.createChat());
    }
    // TODO: dispatch redux action to send message
  }, [dispatch, currentChatMessages.length]);

  return (
    <>
      <ChatHeader />
      <div className={styles['chat-body']}>
        <RouterOutlet />
      </div>
      <ChatFooter key={id} onSend={handleSend} />
    </>
  );
};

export { ChatLayout };
