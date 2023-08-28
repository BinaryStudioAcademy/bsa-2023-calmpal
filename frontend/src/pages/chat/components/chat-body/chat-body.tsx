import { ChatRole } from '#libs/enums/enums.js';
import { useAppChat, useCallback } from '#libs/hooks/hooks.js';

import { BotMessage } from '../bot-message/bot-message.js';
import { ChatFooter } from '../chat-footer/chat-footer.js';
import { UserMessage } from '../user-message/user-message.js';
import styles from './styles.module.scss';

const ChatBody: React.FC = () => {
  const { messages, addMessage } = useAppChat();

  const useHandleSend = useCallback(
    ({ text }: { text: string }): void => {
      addMessage(text);
    },
    [addMessage],
  );

  return (
    <>
      <section className={styles['chat-body']}>
        {messages.map(({ sender, message }, index) => {
          return sender === ChatRole.USER ? (
            <UserMessage key={index} messages={message} />
          ) : (
            <BotMessage key={index} messages={message} />
          );
        })}
      </section>
      <ChatFooter onSend={useHandleSend} />
    </>
  );
};

export { ChatBody };
