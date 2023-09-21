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
  setIsSidebarShown: (value: boolean) => void;
};

const ChatSidebar: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector(({ chats }) => {
    return {
      chats: chats.chats,
    };
  });
  const { setFilter, filter } = useSearch();

  useEffect(() => {
    void dispatch(chatsActions.getAllChats(filter));
  }, [dispatch, filter]);

  const handleSelectChat = useCallback(() => {
    setIsSidebarShown(false);
    // TODO redux logic
  }, [setIsSidebarShown]);

  return (
    <Sidebar isSidebarShown={isSidebarShown}>
      <SidebarHeader>
        <div className={styles['info']}>
          <span>Chat</span>
          <span className={styles['chat-number']}>{chats.length}</span>
        </div>
        <div className={styles['plus']}>
          <Link to={AppRoute.CHATS}>
            <Icon name="plus" color={IconColor.BLUE} width={30} height={30} />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarBody>
        <div className={styles['search']}>
          <Search onValueChange={setFilter} defaultValue={filter} />
        </div>
        <div className={styles['chat-list']}>
          {chats.map((chat) => {
            const chatLink = AppRoute.CHATS_$ID.replace(
              ':id',
              String(chat.id),
            ) as ValueOf<typeof AppRoute>;

            return (
              <Link key={chat.id} to={chatLink}>
                <Card
                  title={chat.name}
                  imageUrl={cardPlaceholder}
                  onClick={handleSelectChat}
                  isActive={String(chat.id) === id}
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
