import { UserRole } from '#libs/enums/enums.js';
import { generateUUID } from '#libs/helpers/helpers.js';
import { useAppChat, useCallback } from '#libs/hooks/hooks.js';
import { ChatHeader } from '#pages/chat/components/chat-header/chat-header.js';

import { ChatFooter } from '../chat-footer/chat-footer.js';
import { ChatMessage } from '../chat-message/chat-message.js';
import styles from './styles.module.scss';

const ChatLayout: React.FC = () => {
  const { messages, newMessage } = useAppChat();

  const handleSend = useCallback(
    ({ text }: { text: string }): void => {
      newMessage({
        sender: UserRole.USER,
        messages: [{ id: generateUUID(), message: text }],
        id: generateUUID(),
      });
    },
    [newMessage],
  );

  return (
    <>
      <ChatHeader />
      <section className={styles['chat-body']}>
        <ChatMessage chatRecord={messages} />
      </section>
      <ChatFooter onSend={handleSend} />
    </>
  );
};

export { ChatLayout };
