import { type SetURLSearchParams } from 'react-router-dom';

import cardPlaceholder from '#assets/img/card-image-placeholder.png';
import { Card, Icon, Search, Sidebar } from '#libs/components/components.js';
import {
  SidebarBody,
  SidebarHeader,
} from '#libs/components/sidebar/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import { useCallback, useSearch } from '#libs/hooks/hooks.js';

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
type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: SetURLSearchParams;
};

const ChatSidebar: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const { filteredElements, setFilter } = useSearch(mockedChats, 'name');
  const handleSelectChat = useCallback(
    (id: number) => {
      return () => {
        mockedSelectedChat.id = id;
        setIsSidebarShown({ isSidebarShownParam: 'false' });
        // TODO redux logic
      };
    },
    [setIsSidebarShown],
  );

  return (
    <Sidebar isSidebarShown={isSidebarShown}>
      <SidebarHeader>
        <div className={styles['info']}>
          <span>Chat</span>
          <span className={styles['chat-number']}>
            {filteredElements.length}
          </span>
        </div>
        <div className={styles['plus']}>
          <Icon name={'plus'} color={IconColor.BLUE} />
        </div>
      </SidebarHeader>
      <SidebarBody>
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
      </SidebarBody>
    </Sidebar>
  );
};

export { ChatSidebar };
