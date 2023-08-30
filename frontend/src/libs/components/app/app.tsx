import home from '#assets/img/home.svg';
import {
  Header,
  Loader,
  MeditationPlayer,
  RouterOutlet,
  Sidebar,
} from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '#libs/hooks/hooks.js';
import { actions as authActions } from '#slices/auth/auth.js';

import styles from './styles.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authenticatedUserDataStatus } = useAppSelector(({ auth }) => ({
    authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
  }));

  useEffect(() => {
    void dispatch(authActions.getAuthenticatedUser());
  }, [dispatch]);

  if (authenticatedUserDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  const image = '../../../../public/images/meditation-image.svg';

  return (
    <div className={styles['app-container']}>
      <Sidebar routes={[{ path: AppRoute.ROOT, name: 'home', icon: home }]} />
      <div className={styles['body-container']}>
        <Header />
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
