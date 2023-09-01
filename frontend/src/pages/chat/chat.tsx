import { ChatLayout } from './components/components.js';
import styles from './styles.module.scss';

const ChatPage: React.FC = () => {
  return (
    <main className={styles['view-port']}>
      <aside className={styles['chat-panel']} />
      <section className={styles['chat-container']}>
        <ChatLayout />
      </section>
    </main>
  );
};

export { ChatPage };
