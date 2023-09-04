import cardPlaceholder from '#assets/img/card-image-placeholder.png';
import { IconColor } from '#libs/enums/enums.js';
import { useCallback, useSearch } from '#libs/hooks/hooks.js';

import { Card, Icon, Search } from '../components.js';
import styles from './styles.module.scss';

const mockedChats = [
  { id: 1, name: 'Relationship' },
  { id: 2, name: 'Friends' },
  { id: 3, name: 'Family' },
  { id: 4, name: 'Work' },
];

const mockedSelectedChat = {
  id: 1,
};

const ChatSidebar: React.FC = () => {
  const { filteredElements, setFilter } = useSearch(mockedChats, 'name');

  const handleSelectChat = useCallback((id: number) => {
    return () => {
      mockedSelectedChat.id = id;
      // TODO redux logic
    };
  }, []);

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
          <Icon name={'plus'} color={IconColor.BLUE} />
        </div>
      </div>
      <div className={styles['list']}>
        <div className={styles['search']}>
          <Search onValueChange={setFilter} />
        </div>
        <div className={styles['chat-list']}>
          {filteredElements.map((filteredChat) => {
            return (
              <Card
                title={filteredChat.name}
                imageUrl={cardPlaceholder}
                onClick={handleSelectChat(filteredChat.id)}
                isActive={mockedSelectedChat.id === filteredChat.id}
                key={filteredChat.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { ChatSidebar };
