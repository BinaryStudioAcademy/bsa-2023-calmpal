import logoS from '#assets/img/logo-s.svg';
import { Icon, Link, Modal } from '#libs/components/components.js';
import {
  DeleteAccount,
  DeleteAccountForm,
  DeleteAccountMessage,
} from '#libs/components/modal/steps/delete-account/delete-account.js';
import { AppRoute, IconColor } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { useCallback, useLocation, useState } from '#libs/hooks/hooks.js';
import { type Route } from '#libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  routes: Route[];
};

const Sidebar: React.FC<Properties> = ({ routes }) => {
  const { pathname } = useLocation();

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback((): void => {
    setModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const steps = [
    {
      component: <DeleteAccountMessage />,
      title: 'We are Sad that you are Leaving',
    },
    {
      component: <DeleteAccountForm />,
      title: 'Please tell us why',
    },
    {
      component: <DeleteAccount />,
      title: 'Your account will be deleted',
    },
  ];

  return (
    <div className={styles['sidebar']}>
      <nav className={styles['nav']}>
        <Link to={AppRoute.ROOT}>
          <img src={logoS} alt="CalmPal logo" />
        </Link>
      </nav>
      <nav className={styles['nav']}>
        <div className={styles['icons-container']}>
          {routes.map((route) => {
            return (
              <button
                key={route.name}
                className={getValidClassNames(
                  styles['icon-container'],
                  pathname === route.path && styles['icon-selected'],
                )}
              >
                <Link className={styles['link'] as string} to={route.path}>
                  <span>
                    <span className="visually-hidden">Go to {route.name}</span>
                    <Icon name={route.icon} color={IconColor.BLUE} />
                  </span>
                </Link>
              </button>
            );
          })}
        </div>
        <div>
          <button onClick={toggleModal}>modal</button>

          <Modal
            isDisplayed={isModalOpen}
            steps={steps}
            onClose={toggleModal}
          />
        </div>
      </nav>
    </div>
  );
};

export { Sidebar };
