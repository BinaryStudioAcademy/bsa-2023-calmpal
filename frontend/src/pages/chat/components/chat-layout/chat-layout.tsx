import { RouterOutlet } from '#libs/components/components.js';
import { useCallback, useParams } from '#libs/hooks/hooks.js';
import { ChatFooter, ChatHeader } from '#pages/chat/components/components.js';

import styles from './styles.module.scss';

const ChatLayout: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleSend = useCallback((): void => {
    // TODO: dispatch redux action to send message
  }, []);

  return (
    <>
      <ChatHeader />
      <div className={styles['chat-body']}>
        <RouterOutlet />
      </div>
      <ChatFooter key={id} onSend={handleSend} />
    </>
  );
};

export { ChatLayout };
