import { useCallback, useEffect } from 'react';

import { ChatRole } from '#libs/enums/enums.js';
import { useMessageReducer } from '#libs/hooks/hooks.js';
import { type Message } from '#libs/types/types.js';

import { BotMessage } from '../bot-message/bot-message.js';
import { ChatFooter } from '../chat-footer/chat-footer.js';
import { UserMessage } from '../user-message/user-message.js';
import styles from './styles.module.scss';

const DOCTOR_FREUD_GREETING =
  'Hello, I am Doctor Freud 👨‍⚕️. How can I help you?';

const ChatBody: React.FC = () => {
  const { messages, addMessage, newMessage } = useMessageReducer();

  const handleSend = useCallback(
    (text: string): void => {
      addMessage(text);
    },
    [addMessage],
  );

  useEffect(() => {
    const message: Message = {
      sender: ChatRole.BOT,
      message: [DOCTOR_FREUD_GREETING],
    };
    newMessage(message);
  }, [newMessage]);

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
      <ChatFooter onSend={handleSend} />
    </>
  );
};

export { ChatBody };
