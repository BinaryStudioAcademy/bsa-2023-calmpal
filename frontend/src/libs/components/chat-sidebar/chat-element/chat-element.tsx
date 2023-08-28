import { PlainSvgIcon } from '#libs/components/components.js';
import { IconNameToIcon } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  chat: Chat;
};

type Chat = {
  id: number;
  name: string;
};

// mocked data
const selectedChat = {
  id: 1,
};

const ChatElement: React.FC<Properties> = ({ chat }) => {
  const handleSelectChat = useCallback(() => {
    // TODO: redux logic for chat selection
  }, []);
  const isSelected = selectedChat.id === chat.id;

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
      <div className={styles['trash-box']}>
        <PlainSvgIcon name={IconNameToIcon.TRASHBOX} />
      </div>
    </button>
  );
};

export { ChatElement };
