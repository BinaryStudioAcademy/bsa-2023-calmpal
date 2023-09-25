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
} from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';
import { actions as chatsActions } from '#slices/chats/chats.js';

import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  onSetIsSidebarShow: (value: boolean) => void;
  filter: string;
  onSetFilter: (query: string) => void;
};

const ChatSidebar: React.FC<Properties> = ({
  isSidebarShown,
  onSetIsSidebarShow,
  filter,
  onSetFilter,
}) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector(({ chats }) => {
    return {
      chats: chats.chats,
    };
  });

  useEffect(() => {
    void dispatch(chatsActions.getAllChats(filter));
  }, [dispatch, filter]);

  const handleSelectChat = useCallback(() => {
    onSetIsSidebarShow(false);
    // TODO redux logic
  }, [onSetIsSidebarShow]);

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
          <Search onValueChange={onSetFilter} defaultValue={filter} />
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
