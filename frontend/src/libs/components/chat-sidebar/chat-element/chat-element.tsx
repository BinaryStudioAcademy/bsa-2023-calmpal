import { getValidClassNames } from '#libs/helpers/helpers.js';

import { useCallback } from '../../../hooks/hooks.js';
import styles from './styles.module.scss';

type Properties = {
  chat: Chat;
  isSelected: boolean;
  onSelectChat: (id: number) => void;
};

type Chat = {
  id: number;
  name: string;
};

const ChatElement: React.FC<Properties> = ({
  chat,
  isSelected,
  onSelectChat,
}) => {
  const handleSelectChat = useCallback(() => {
    onSelectChat(chat.id);
  }, [chat.id, onSelectChat]);

  return (
    <button
      className={getValidClassNames(
        styles['chat-element'],
        isSelected && styles['selected'],
      )}
      onClick={handleSelectChat}
    >
      <div className={styles['name']}>
        <img src="chat-logo.svg" alt="not found" />
        {chat.name}
      </div>
      <div className={styles['arrow']}>
        <img src="arrow.svg" alt="not found" />
      </div>
    </button>
  );
};

export { ChatElement };
