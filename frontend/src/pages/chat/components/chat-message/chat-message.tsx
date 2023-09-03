import { Icon } from '#libs/components/components.js';
import { ChatRole } from '#libs/enums/enums.js';
import { type ChatMessage } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  messages: ChatMessage[];
};

type Message = {
  message: string;
  id: string;
};

const ChatMessage: React.FC<Properties> = ({ messages }) => (
  <>
    {messages.map(({ message, id, sender }) => {
      const isUser = sender === ChatRole.USER;

      return isUser ? (
        <div className={styles['user-message-container']} key={id}>
          <div className={styles['user-message-content']}>
            {message.map(({ message, id }: Message) => (
              <span key={id} className={styles['user-message-item']}>
                <p className={styles['user-message-text']}>{message}</p>
              </span>
            ))}
          </div>
          <span className={styles['user-avatar']} />
        </div>
      ) : (
        <div className={styles['bot-message-container']} key={id}>
          <Icon name="chat-logo" className={styles['bot-avatar']} />
          <div className={styles['bot-message-child-container']}>
            {message.map(({ message, id }: Message) => (
              <span key={id} className={styles['bot-message-text']}>
                {message}
              </span>
            ))}
          </div>
        </div>
      );
    })}
  </>
);

export { ChatMessage };
