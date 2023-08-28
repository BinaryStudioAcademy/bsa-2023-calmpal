import { Header } from '#libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '#libs/hooks/hooks.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { PreferencesStep } from './components/components.js';
import styles from './styles.module.scss';

const Survey: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId /*isSurveyCompleted*/ } = useAppSelector(({ auth }) => ({
    userId: auth.authenticatedUser?.id,
    // isSurveyCompleted: auth.authenticatedUser?.isSurveyCompleted,
  }));

  const onSubmit = useCallback(
    (options: string[]) => {
      void dispatch(
        authActions.createUserSurveyPreferences({
          userId: userId as number,
          preferences: options,
        }),
      );
    },
    [dispatch, userId],
  );

  // if (isSurveyCompleted) {
  //   return <Navigate to={AppRoute.ROOT} />;
  // }

  return (
    <div className={styles['container']}>
      <Header />

      <div className={styles['survey']}>
        <div className={styles['name']}>
          Serenity is your trusted companion on the journey to mental well-being
        </div>

        <PreferencesStep onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export { Survey };
