import { Icon } from '#libs/components/components.js';

import styles from './styles.module.scss';

const ChatHeader: React.FC = () => {
  return (
    <header className={styles['chat-header']}>
      <div className={styles['header-content']}>
        <Icon name="chat-page" className={styles['logo']} />
        <span className={styles['title']}>Doctor Freud.ai</span>
      </div>
      <hr className={styles['separator']} />
    </header>
  );
};

export { ChatHeader };
