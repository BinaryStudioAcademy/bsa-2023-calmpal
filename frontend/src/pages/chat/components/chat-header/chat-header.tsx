import chatLogo from '#/assets/img/chat-logo.svg';

import styles from './styles.module.scss';

const ChatHeader: React.FC = () => (
  <header className={styles['chat-header']}>
    <div className={styles['header-content']}>
      <img src={chatLogo} className={styles['logo']} alt="chat-logo" />
      <span className={styles['title']}>Doctor Freud.ai</span>
    </div>
    <hr className={styles['separator']} />
  </header>
);

export { ChatHeader };
