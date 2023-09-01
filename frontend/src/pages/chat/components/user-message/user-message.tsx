import { generateUUID } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  messages: string[];
};

const UserMessage: React.FC<Properties> = ({ messages }) => {
  return (
    <div className={styles['user-message-container']}>
      <span className={styles['user-avatar']} />
      <div className={styles['user-message-content']}>
        {messages.map((message) => (
          <span key={generateUUID()} className={styles['message-text']}>
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export { UserMessage };
