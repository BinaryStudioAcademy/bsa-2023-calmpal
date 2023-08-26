import { IconName } from '#libs/enums/enums.js';
import { useCallback, useSearch, useState } from '#libs/hooks/hooks.js';

import { Icon, Search } from '../components.js';
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
  const handleFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setFilter(event.target.value);
    },
    [],
  );
  const filteredChats = useSearch(filter, chats, 'name');

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['info']}>
          <span>Chat</span>
          <span className={styles['chat-number']}>{chats.length}</span>
        </div>
        <div className={styles['plus']}>
          <Icon name={IconName.PLUS} />
        </div>
      </div>
      <div className={styles['list']}>
        <div className={styles['search']}>
          <Search value={filter} onValueChange={handleFilterChange} />
        </div>
        <div className={styles['chat-list']}>
          {filteredChats.map((filteredChat) => (
            <ChatElement chat={filteredChat} key={filteredChat.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ChatSidebar };
