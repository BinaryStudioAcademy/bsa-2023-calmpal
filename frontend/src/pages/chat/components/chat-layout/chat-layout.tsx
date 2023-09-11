import { useCallback } from '#libs/hooks/hooks.js';
import { ChatHeader } from '#pages/chat/components/chat-header/chat-header.js';
import { MOCK_MESSAGE } from '#pages/chat/libs/constants/constants.js';

import { ChatFooter } from '../chat-footer/chat-footer.js';
import { ChatMessage } from '../chat-message/chat-message.js';
import styles from './styles.module.scss';

const ChatLayout: React.FC = () => {
  const handleSend = useCallback((): void => {
    // TODO: dispatch redux action to send message
  }, []);

  return (
    <>
      <ChatHeader />
      <div className={styles['chat-body']}>
        <ChatMessage item={[MOCK_MESSAGE]} />
      </div>
      <ChatFooter onSend={handleSend} />
    </>
  );
};

export { ChatLayout };
