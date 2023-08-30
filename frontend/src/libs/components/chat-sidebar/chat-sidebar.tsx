import { IconNameToIcon } from '#libs/enums/enums.js';
import { useCallback, useSearch } from '#libs/hooks/hooks.js';
import { type SearchInput } from '#libs/types/types.js';

import { Icon, Search } from '../components.js';
import { ChatCardItem } from './chat-card-item/chat-card-item.js';
import styles from './styles.module.scss';

const mockedChats = [
  { id: 1, name: 'Relationship' },
  { id: 2, name: 'Friends' },
  { id: 3, name: 'Family' },
  { id: 4, name: 'Work' },
];

const ChatSidebar: React.FC = () => {
  const { filteredElements, setFilter } = useSearch(mockedChats, 'name');
  const handleFilterChange = useCallback(
    (payload: SearchInput): void => {
      setFilter(payload.search);
    },
    [setFilter],
  );

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <div className={styles['info']}>
          <span>Chat</span>
          <span className={styles['chat-number']}>
            {filteredElements.length}
          </span>
        </div>
        <div className={styles['plus']}>
          <Icon name={IconNameToIcon.PLUS} />
        </div>
      </div>
      <div className={styles['list']}>
        <div className={styles['search']}>
          <Search onValueChange={handleFilterChange} />
        </div>
        <div className={styles['chat-list']}>
          {filteredElements.map((filteredChat) => (
            <ChatCardItem chat={filteredChat} key={filteredChat.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { ChatSidebar };
