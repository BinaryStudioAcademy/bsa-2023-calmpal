import { ChatRole } from '#libs/enums/enums.js';
import { useAppChat, useCallback } from '#libs/hooks/hooks.js';

import { BotMessage } from '../bot-message/bot-message.js';
import { ChatFooter } from '../chat-footer/chat-footer.js';
import { UserMessage } from '../user-message/user-message.js';
import styles from './styles.module.scss';

const ChatBody: React.FC = () => {
  const { messages, newMessage } = useAppChat();

  const handleSend = useCallback(
    ({ text }: { text: string }): void => {
      newMessage({
        sender: ChatRole.USER,
        message: [text],
        id: crypto.randomUUID(),
      });
    },
    [newMessage],
  );

  return (
    <>
      <section className={styles['chat-body']}>
        {messages.map(({ sender, message }, index) => {
          const isUser = sender === ChatRole.USER;

          return isUser ? (
            <UserMessage key={index} messages={message} />
          ) : (
            <BotMessage key={index} messages={message} />
          );
        })}
      </section>
      <ChatFooter onSend={handleSend} />
    </>
  );
};

export { ChatBody };
