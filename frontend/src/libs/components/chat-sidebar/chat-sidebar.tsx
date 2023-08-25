import { useCallback, useSearch, useState } from '../../hooks/hooks.js';
import { Search } from '../components.js';
import { ChatElement } from './chat-element/chat-element.js';
import styles from './styles.module.scss';

//mocked data
const chats = [
  { id: 1, name: 'Relationship' },
  { id: 2, name: 'Friends' },
  { id: 3, name: 'Family' },
  { id: 4, name: 'Work' },
];

const ChatSidebar: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [selectedChat, setSelectedChat] = useState({ id: 1 });
  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setFilter(event.target.value);
    },
    [],
  );
  const filteredChats = useSearch(filter, chats, 'name');
  const handleSelectChat = useCallback((id: number): void => {
    setSelectedChat({ id });
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['info']}>
          <span>Chat</span>
          <span className={styles['chat-number']}>{chats.length}</span>
        </div>
        <img src="plus.svg" alt="not found" className={styles['plus']} />
      </div>
      <div className={styles['list']}>
        <div className={styles['search']}>
          <Search value={filter} handleValueChange={handleFilterChange} />
        </div>
        <div className={styles['chat-list']}>
          {filteredChats.map((filteredChat) => (
            <ChatElement
              chat={filteredChat}
              key={filteredChat.id}
              isSelected={filteredChat.id === selectedChat.id}
              onSelectChat={handleSelectChat}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ChatSidebar };
