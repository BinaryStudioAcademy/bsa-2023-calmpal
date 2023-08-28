import styles from './styles.module.scss';

type UserMessageProperties = {
  messages: string[];
};

const UserMessage: React.FC<UserMessageProperties> = ({ messages }) => {
  return (
    <div className={styles['user-message-container']}>
      <span className={styles['user-avatar']} />
      <div className={styles['user-message-content']}>
        {messages.map((message, index) => (
          <span key={index} className={styles['message-text']}>
            {message}
          </span>
        ))}
      </div>
    </div>
  );
};

export { UserMessage };
