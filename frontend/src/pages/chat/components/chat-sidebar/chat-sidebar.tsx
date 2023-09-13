import cardPlaceholder from '#assets/img/card-image-placeholder.png';
import { Card, Icon, Link, Search } from '#libs/components/components.js';
import { IconColor } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useSearch,
} from '#libs/hooks/hooks.js';
import { actions as chatsActions } from '#slices/chats/chats.js';

import styles from './styles.module.scss';

const ChatSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector(({ chats }) => {
    return {
      chats: chats.chats,
    };
  });

  useEffect(() => {
    void dispatch(chatsActions.getAllChats());
  }, [dispatch]);

  const { filteredElements, setFilter } = useSearch(chats, 'name');

  const handleSelectChat = useCallback(() => {
    // TODO redux logic
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
          <Link to="/chats">
            <Icon name={'plus'} color={IconColor.BLUE} />
          </Link>
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
                onClick={handleSelectChat}
                isActive={false}
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
