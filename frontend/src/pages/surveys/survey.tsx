import { Loader, Navigate } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { PreferencesStep } from './components/components.js';
import styles from './styles.module.scss';

const Survey: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    user: { id: userId, isSurveyCompleted },
    surveyPreferencesDataStatus,
  } = useAppSelector(({ auth }) => {
    return {
      user: auth.authenticatedUser as UserAuthResponseDto,
      surveyPreferencesDataStatus: auth.surveyPreferencesDataStatus,
    };
  });

  const handleSubmit = useCallback(
    (options: string[]) => {
      void dispatch(
        authActions.createUserSurvey({
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
      {surveyPreferencesDataStatus === DataStatus.PENDING ? (
        <Loader isOverflow />
      ) : (
        <div className={styles['survey']}>
          <h2 className={styles['title']}>
            CalmPal is your trusted companion on the journey to mental
            well-being
          </h2>
          <PreferencesStep onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export { Survey };
