import { Icon } from '#libs/components/components.js';

import styles from './styles.module.scss';

type Properties = {
  messages: string[];
};

const BotMessage: React.FC<Properties> = ({ messages }) => {
  return (
    <div className={styles['bot-message-container']}>
      <Icon name="chat-logo" className={styles['bot-avatar']} />
      <div className={styles['message-container']}>
        {messages.map((message, index) => (
          <span key={index} className={styles['message-text']}>
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export { BotMessage };
