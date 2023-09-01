import { Icon } from '#libs/components/components.js';
import { generateUUID } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  messages: string[];
};

const BotMessage: React.FC<Properties> = ({ messages }) => {
  return (
    <div className={styles['bot-message-container']}>
      <div className={styles['message-container']}>
        {messages.map((message) => (
          <span key={generateUUID()} className={styles['message-text']}>
            {message}
          </span>
        ))}
      </div>
      <Icon name="chat-logo" className={styles['bot-avatar']} />
    </div>
  );
};

export { BotMessage };
