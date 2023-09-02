import { type InputMessage } from '#libs/types/types.js';

import styles from './styles.module.scss';

const UserMessage: React.FC<InputMessage> = ({ messages }) => {
  return (
    <div className={styles['user-message-container']}>
      <div className={styles['user-message-content']}>
        {messages.map(({ message, id }) => (
          <span key={id} className={styles['message-item']}>
            <p className={styles['message-text']}> {message} </p>
          </span>
        ))}
      </div>
      <span className={styles['user-avatar']} />
    </div>
  );
};

export { UserMessage };
