import { ChatLayout, ChatSidebar } from './components/components.js';
import styles from './styles.module.scss';

const Chat: React.FC = () => {
  return (
    <main className={styles['view-port']}>
      <aside className={styles['chat-panel']}>
        <ChatSidebar />
      </aside>
      <section className={styles['chat-container']}>
        <ChatLayout />
      </section>
    </main>
  );
};

export { Chat };
