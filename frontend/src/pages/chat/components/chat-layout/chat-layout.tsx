import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useParams,
} from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import {
  ChatFooter,
  ChatHeader,
  ChatMessage,
} from '#pages/chat/components/components.js';
import {
  EMPTY_ARRAY_LENGTH,
  MOCK_MESSAGES,
} from '#pages/chat/libs/constants/constants.js';
import { type ChatInputValue } from '#pages/chat/libs/types/types.js';
import { actions as chatActions } from '#slices/chats/chats.js';

import styles from './styles.module.scss';

const ChatLayout: React.FC = () => {
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

  return (
    <>
      <ChatHeader />
      <div className={styles['chat-body']}>
        {hasId &&
          MOCK_MESSAGES.map((item) => {
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
