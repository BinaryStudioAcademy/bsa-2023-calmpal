import { Navigate } from 'react-router-dom';

import { Header } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/app-route.enum.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '#libs/hooks/hooks.js';
import { actions as surveyActions } from '#slices/survey/survey.js';

import { PreferencesStep } from './components/components.js';
import styles from './styles.module.scss';

const Survey: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId, surveyPreferences } = useAppSelector(({ auth, survey }) => ({
    userId: auth.authenticatedUser?.id,
    surveyPreferences: survey.isSurveyCompleted,
  }));

  const onSubmit = useCallback(
    (options: string[]) => {
      void dispatch(
        surveyActions.createUserSurveyPreferences({
          userId: userId as number,
          preferences: options,
        }),
      );
    },
    [dispatch, userId],
  );

  if (surveyPreferences) {
    return <Navigate to={AppRoute.ROOT} />;
  }

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
