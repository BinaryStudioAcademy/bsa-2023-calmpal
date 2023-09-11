import { Icon } from '#libs/components/components.js';
import { IconColor, UserRole } from '#libs/enums/enums.js';
import { type ChatMessage } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  chatRecord: ChatMessage[];
};

const ChatMessage: React.FC<Properties> = ({ chatRecord }) => {
  return (
    <>
      {chatRecord.map(({ messages, id: chatId, sender }) => {
        const isUser = sender === UserRole.USER;

        return isUser ? (
          <div className={styles['user-message-container']} key={chatId}>
            <div className={styles['user-message-content']}>
              {messages.map(({ message, id }) => {
                return (
                  <span key={id} className={styles['user-message-item']}>
                    <p className={styles['user-message-text']}>{message}</p>
                  </span>
                );
              })}
            </div>
            <span className={styles['user-avatar']} />
          </div>
        ) : (
          <div className={styles['bot-message-container']} key={chatId}>
            <div className={styles['bot-avatar']}>
              <Icon name="chatbot-avatar" color={IconColor.BLUE} />
            </div>
            <div className={styles['bot-message-child-container']}>
              {messages.map(({ message, id }) => {
                return (
                  <span key={id} className={styles['bot-message-text']}>
                    {message}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export { ChatMessage };
