import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useLocation,
  useMemo,
  useParams,
} from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import {
  ChatFooter,
  ChatHeader,
  ChatMessage,
} from '#pages/chat/components/components.js';
import { EMPTY_ARRAY_LENGTH } from '#pages/chat/libs/constants/constants.js';
import { type ChatInputValue } from '#pages/chat/libs/types/types.js';
import { actions as chatActions } from '#slices/chats/chats.js';

import styles from './styles.module.scss';

const ChatLayout: React.FC = () => {
  const location = useLocation();

  const LAST_INDEX_DIFFERENCE = 1;
  const chatId = useMemo(() => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments.at(
      pathSegments.length - LAST_INDEX_DIFFERENCE,
    );
    const chatId = Number.parseInt(lastSegment as string);
    if (!Number.isNaN(chatId)) {
      return chatId;
    }

    return null;
  }, [location.pathname]);

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentChatMessages, authenticatedUser } = useAppSelector(
    ({ chats, auth }) => {
      return {
        currentChatMessages: chats.currentChatMessages,
        authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
      };
    },
  );
  const hasId = Boolean(id);

  const handleSend = useCallback(
    ({ message }: ChatInputValue): void => {
      if (!hasId && currentChatMessages.length === EMPTY_ARRAY_LENGTH) {
        void dispatch(chatActions.createChat({ message }));
      }
      // TODO: dispatch redux action to send message
    },
    [dispatch, currentChatMessages.length, hasId],
  );

  useEffect(() => {
    if (chatId) {
      void dispatch(chatActions.getCurrentChatMessages(chatId.toString()));
    }
  }, [dispatch, chatId]);

  return (
    <>
      <ChatHeader />
      <div className={styles['chat-body']}>
        {hasId &&
          currentChatMessages.map((item) => {
            return (
              <ChatMessage
                key={item.id}
                message={item.message}
                isSender={item.senderId === authenticatedUser.id}
              />
            );
          })}
      </div>
      <ChatFooter onSend={handleSend} />
    </>
  );
};

export { ChatLayout };
