import styles from './styles.module.scss';

type Properties = {
  messages: string[];
};

const UserMessage: React.FC<Properties> = ({ messages }) => {
  return (
    <div className={styles['user-message-container']}>
      <div className={styles['user-message-content']}>
        {messages.map((message, index) => (
          <span key={index} className={styles['message-item']}>
            <p className={styles['message-text']}> {message} </p>
          </span>
        ))}
      </div>
      <span className={styles['user-avatar']} />
    </div>
  );
};

export { UserMessage };
