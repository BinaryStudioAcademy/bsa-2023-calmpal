import { Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';

import styles from './styles.module.scss';

const ChatHeader: React.FC = () => {
  return (
    <header className={styles['chat-header']}>
      <div className={styles['header-content']}>
        <div className={styles['logo']}>
          <Icon name="chatbot-avatar" color={IconColor.BLUE} />
        </div>
        <span className={styles['title']}>Doctor Freud.ai</span>
      </div>
    </header>
  );
};

export { ChatHeader };
