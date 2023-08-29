import home from '#assets/img/home.svg';
import reactLogo from '#assets/img/react.svg';
import {
  Header,
  Link,
  MeditationPlayer,
  RouterOutlet,
} from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { useAppDispatch, useEffect, useLocation } from '#libs/hooks/hooks.js';
import { actions as userActions } from '#slices/users/users.js';

import { Sidebar } from '../sidebar/sidebar.js';
import styles from './styles.module.scss';

const image = '/images/meditation-image.svg';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const isRoot = pathname === AppRoute.ROOT;

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll());
    }
  }, [isRoot, dispatch]);

  return (
    <div className={styles['app-container']}>
      <Sidebar
        routes={[
          { path: AppRoute.ROOT, name: 'home', icon: home },
          { path: AppRoute.SIGN_IN, name: 'sign-in', icon: home },
          { path: AppRoute.SIGN_UP, name: 'sign-up', icon: home },
        ]}
      />
      <div className={styles['body-container']}>
        <Header />
        <img src={reactLogo} className="App-logo" width="30" alt="logo" />

        <ul className="App-navigation-list">
          <li>
            <Link to={AppRoute.ROOT}>Root</Link>
          </li>
          <li>
            <Link to={AppRoute.SIGN_IN}>Sign in</Link>
          </li>
          <li>
            <Link to={AppRoute.SIGN_UP}>Sign up</Link>
          </li>
        </ul>
        <p>Current path: {pathname}</p>

        <div>
          <RouterOutlet />
        </div>
        <MeditationPlayer
          playlist={[
            {
              id: 1,
              title: 'Meditation for deep sleep',
              purpose: 'Stress relief',
              src: 'http://traffic.libsyn.com/mindfulorg/winston-breathing-5mins.mp3',
              img: image,
            },
            {
              id: 2,
              title: 'Meditation for relaxing',
              purpose: 'Relax',
              src: 'http://traffic.libsyn.com/mindfulorg/SusanKaiserGreenland.mp3',
              img: image,
            },
            {
              id: 3,
              title: 'Meditation for breath practice',
              purpose: 'Breathing',
              src: 'http://traffic.libsyn.com/mindfulorg/LovingKindness.mp3',
              img: image,
            },
          ]}
        />
      </div>
    </div>
  );
};

export { App };
