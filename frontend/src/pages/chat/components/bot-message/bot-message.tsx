import chatLogo from '#/assets/img/chat-logo.svg';

import styles from './styles.module.scss';

type BotMessageProperties = {
  messages: string[];
};

const BotMessage: React.FC<BotMessageProperties> = ({ messages }) => {
  return (
    <div className={styles['bot-message-container']}>
      <div className={styles['message-container']}>
        {messages.map((message, index) => (
          <div key={index} className={styles['message']}>
            <span className={styles['message-text']}>{message}</span>
          </div>
        ))}
      </div>
      <img src={chatLogo} className={styles['bot-avatar']} alt="bot-avatar" />
    </div>
  );
};

export { BotMessage };
