import cardPlaceholder from '#assets/img/card-image-placeholder.png';
import {
  Card,
  Icon,
  Link,
  Search,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '#libs/components/components.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
  useSearch,
} from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';
import { actions as chatsActions } from '#slices/chats/chats.js';

import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  onSetIsSidebarShow: (value: boolean) => void;
};

const ChatSidebar: React.FC<Properties> = ({
  isSidebarShown,
  onSetIsSidebarShow,
}) => {
  const { id } = useParams<{ id: string }>();
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
    onSetIsSidebarShow(false);
    // TODO redux logic
  }, [onSetIsSidebarShow]);

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
          <Link to={AppRoute.CHATS}>
            <Icon name="plus" color={IconColor.BLUE} width={33} height={33} />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarBody>
        <div className={styles['search']}>
          <Search onValueChange={setFilter} />
        </div>
        <div className={styles['chat-list']}>
          {filteredElements.map((filteredChat) => {
            const chatLink = AppRoute.CHATS_$ID.replace(
              ':id',
              String(filteredChat.id),
            ) as ValueOf<typeof AppRoute>;

            return (
              <Link key={filteredChat.id} to={chatLink}>
                <Card
                  title={filteredChat.name}
                  imageUrl={cardPlaceholder}
                  onClick={handleSelectChat}
                  isActive={String(filteredChat.id) === id}
                />
              </Link>
            );
          })}
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export { ChatSidebar };
