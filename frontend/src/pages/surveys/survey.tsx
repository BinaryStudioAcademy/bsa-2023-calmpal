import { Header, Navigate } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { PreferencesStep } from './components/components.js';
import styles from './styles.module.scss';

const Survey: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId, isSurveyCompleted } = useAppSelector(({ auth }) => ({
    userId: (auth.authenticatedUser as UserAuthResponseDto).id,
    isSurveyCompleted: auth.authenticatedUser?.isSurveyCompleted,
  }));

  const handleSubmit = useCallback(
    (options: string[]) => {
      void dispatch(
        authActions.createUserSurveyPreferences({
          userId: userId,
          preferences: options,
        }),
      );
    },
    [dispatch, userId],
  );

  if (isSurveyCompleted) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  return (
    <div className={styles['container']}>
      <Header />

      <div className={styles['survey']}>
        <div className={styles['name']}>
          Serenity is your trusted companion on the journey to mental well-being
        </div>

        <PreferencesStep onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export { Survey };
