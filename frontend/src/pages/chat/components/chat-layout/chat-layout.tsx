import { DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useRef,
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

type Properties = {
  filter: string;
};

const ChatLayout: React.FC<Properties> = ({ filter }) => {
  const { id } = useParams<{ id: string }>();
  const bottomElementReference = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const {
    currentChatMessages,
    authenticatedUser,
    createMessageDataStatus,
    generateReplyDataStatus,
  } = useAppSelector(({ chats, auth }) => {
    return {
      currentChatMessages: chats.currentChatMessages,
      authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
      createMessageDataStatus: chats.createMessageDataStatus,
      generateReplyDataStatus: chats.generateReplyDataStatus,
    };
  });
  const hasId = Boolean(id);
  const isChatbotReplyLoading = generateReplyDataStatus === 'pending';

  const handleSend = useCallback(
    ({ message }: ChatInputValue): void => {
      if (!hasId || currentChatMessages.length === EMPTY_ARRAY_LENGTH) {
        void dispatch(chatActions.createChat({ message }));
      } else {
        void dispatch(
          chatActions.createMessage({
            message,
            chatId: id as string,
          }),
        );
      }
    },
    [dispatch, currentChatMessages.length, hasId, id],
  );

  useEffect(() => {
    if (id) {
      void dispatch(chatActions.getCurrentChatMessages(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (createMessageDataStatus === DataStatus.FULFILLED) {
      void dispatch(chatActions.getAllChats(filter));
    }
  }, [createMessageDataStatus, dispatch, filter]);

  useEffect(() => {
    bottomElementReference.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [dispatch, currentChatMessages.length]);

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
        {isChatbotReplyLoading && (
          <div>
            <span className={styles['loader']} />
          </div>
        )}
        <div ref={bottomElementReference} />
      </div>
      <ChatFooter onSend={handleSend} />
    </>
  );
};

export { ChatLayout };
