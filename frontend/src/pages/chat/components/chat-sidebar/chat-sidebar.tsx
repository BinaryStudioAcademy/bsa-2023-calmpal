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
  useRef,
  useSearch,
  useState,
} from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';
import { actions as chatsActions } from '#slices/chats/chats.js';

import { DeleteChatModal } from '../components.js';
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
  const [chatToDelete, setChatToDelete] = useState<null | number>(null);
  const dialogReference = useRef<HTMLDialogElement>(null);

  const { chats } = useAppSelector(({ chats }) => {
    return {
      chats: chats.chats,
    };
  });

  const handleOpen = useCallback(() => {
    dialogReference.current?.showModal();
  }, [dialogReference]);

  useEffect(() => {
    void dispatch(chatsActions.getAllChats());
  }, [dispatch]);

  const { filteredElements, setFilter } = useSearch(chats, 'name');

  const handleSelectChat = useCallback(() => {
    setIsSidebarShown(false);
    // TODO redux logic
  }, [setIsSidebarShown]);

  const handleDeleteChat = useCallback(
    (id: number) => {
      return () => {
        setChatToDelete(id);
        handleOpen();
      };
    },
    [handleOpen],
  );

  return (
    <>
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
              <Icon name="plus" color={IconColor.BLUE} width={30} height={30} />
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
                <Link to={chatLink} key={filteredChat.id}>
                  <div className={styles['wrapper']}>
                    <Card
                      title={filteredChat.name}
                      imageUrl={cardPlaceholder}
                      onClick={handleSelectChat}
                      isActive={String(filteredChat.id) === id}
                      iconRight="trash"
                      onIconClick={handleDeleteChat(filteredChat.id)}
                      iconColor={IconColor.LIGHT_BLUE}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </SidebarBody>
      </Sidebar>
      <DeleteChatModal ref={dialogReference} id={chatToDelete} />
    </>
  );
};

export { ChatSidebar };
