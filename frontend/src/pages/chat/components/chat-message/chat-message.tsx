import { Icon } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  message: string;
  isSender: boolean;
};

const ChatMessage: React.FC<Properties> = ({ message, isSender }) => {
  return (
    <div
      className={getValidClassNames(
        styles['message-container'],
        isSender && styles['user-message-container'],
      )}
    >
      {!isSender && (
        <div className={styles['avatar']}>
          <Icon
            name="chatbot-avatar"
            color={IconColor.BLUE}
            width={40}
            height={40}
          />
        </div>
      )}
      <div
        className={getValidClassNames(
          styles['message-content'],
          isSender && styles['user-message-content'],
        )}
      >
        <p
          className={getValidClassNames(
            styles['message-item'],
            isSender && styles['user-message-item'],
            !isSender && styles['bot-message-item'],
          )}
        >
          {message}
        </p>
      </div>
      {isSender && (
        <div
          className={getValidClassNames(
            styles['avatar'],
            styles['user-avatar'],
          )}
        />
      )}
    </div>
  );
};

export { ChatMessage };
