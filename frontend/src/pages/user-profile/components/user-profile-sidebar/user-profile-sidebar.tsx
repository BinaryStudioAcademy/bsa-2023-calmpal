import {
  Card,
  Icon,
  Modal,
  Sidebar,
  SidebarBody,
  SidebarHeader,
} from '#libs/components/components.js';
import {
  DeleteAccountConfirmation,
  DeleteAccountForm,
  DeleteAccountMessage,
} from '#libs/components/modal/steps/delete-account/delete-account.js';
import { IconColor } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useState,
} from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { SETTINGS_OPTIONS } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  isSidebarShown: boolean;
  setIsSidebarShown: (value: boolean) => void;
};

const UserProfileSidebar: React.FC<Properties> = ({
  isSidebarShown,
  setIsSidebarShown,
}) => {
  const dispatch = useAppDispatch();

  const { authenticatedUser } = useAppSelector(({ auth }) => {
    return {
      authenticatedUser: auth.authenticatedUser as UserAuthResponseDto,
    };
  });

  const [activeItem, setActiveItem] = useState<string>('notification');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = useCallback(
    (key: string) => {
      return () => {
        setIsSidebarShown(false);
        setActiveItem(key);
      };
    },
    [setIsSidebarShown],
  );

  const handleSignOut = useCallback((): void => {
    void dispatch(authActions.signOut());
  }, [dispatch]);

  const toggleModal = useCallback((): void => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const steps = [
    {
      component: <DeleteAccountMessage />,
      title: 'We are sad that you are leaving',
    },
    {
      component: <DeleteAccountForm />,
      title: 'Please tell us why',
    },
    {
      component: <DeleteAccountConfirmation />,
      title: 'Your account will be deleted',
    },
  ];

  return (
    <Sidebar isSidebarShown={isSidebarShown}>
      <SidebarHeader>
        <div className={styles['info']}>
          <span className="visually-hidden">Profile settings</span>
          <span>My Profile</span>
        </div>
      </SidebarHeader>
      <SidebarBody>
        <div className={styles['user']}>
          <div className="visually-hidden">User details</div>
          <div className={styles['user-details']}>
            <div className={styles['user-icon']}>
              <Icon name="user" color={IconColor.WHITE} />
            </div>
            <div className={styles['user-name']}>
              {authenticatedUser.fullName}
            </div>
          </div>
        </div>

        <div className={styles['buttons-container']}>
          <div className="visually-hidden">Profile settings options</div>
          {SETTINGS_OPTIONS.map((option) => {
            return (
              <Card
                key={option.key}
                title={option.title}
                onClick={handleClick(option.key)}
                isActive={activeItem === option.key}
                iconName={option.key}
                iconColor={IconColor.WHITE}
              />
            );
          })}
          <Card
            title="Sign Out"
            onClick={handleSignOut}
            iconName="sign-out"
            iconColor={IconColor.WHITE}
          />
          <Card
            title="Delete account"
            onClick={toggleModal}
            iconName="delete"
            iconColor={IconColor.WHITE}
          />
          <Modal
            isDisplayed={isModalOpen}
            steps={steps}
            onClose={toggleModal}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export { UserProfileSidebar };
