import cardPlaceholder from '#assets/img/card-image-placeholder.png';
import {
  Button,
  Card,
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
  useState,
} from '#libs/hooks/hooks.js';
import { type ValueOf } from '#libs/types/types.js';
import { actions as chatsActions } from '#slices/chats/chats.js';

import { DeleteChatModal } from '../components.js';
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
    void dispatch(chatsActions.getAllChats(filter));
  }, [dispatch, filter]);

  const handleSelectChat = useCallback(() => {
    onSetIsSidebarShow(false);
    // TODO redux logic
  }, [onSetIsSidebarShow]);

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
            <span className={styles['chat-number']}>{chats.length}</span>
          </div>
          <div className={styles['plus']}>
            <Link to={AppRoute.CHATS}>
              <Button
                label="Add note"
                isLabelVisuallyHidden
                iconName="plus"
                iconWidth={33}
                iconHeight={33}
                style="add"
              />
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
                <Link key={chat.id} to={`${chatLink}?query=${filter}`}>
                  <Card
                    title={chat.name}
                    imageUrl={chat.imageUrl ?? cardPlaceholder}
                    onClick={handleSelectChat}
                    isActive={String(chat.id) === id}
                    iconRight="trash-box"
                    onIconClick={handleDeleteChat(chat.id)}
                    iconColor={IconColor.LIGHT_BLUE}
                  />
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
