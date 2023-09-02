import { Icon } from '#libs/components/components.js';
import { type InputMessage } from '#libs/types/types.js';

import styles from './styles.module.scss';

const BotMessage: React.FC<InputMessage> = ({ messages }) => {
  return (
    <div className={styles['bot-message-container']}>
      <Icon name="chat-logo" className={styles['bot-avatar']} />
      <div className={styles['message-container']}>
        {messages.map(({ message, id }) => (
          <span key={id} className={styles['message-text']}>
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export { BotMessage };
