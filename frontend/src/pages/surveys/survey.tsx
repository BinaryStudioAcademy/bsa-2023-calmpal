import { Header, Loader, Navigate } from '#libs/components/components.js';
import { SIDEBAR_ROUTES } from '#libs/components/navigation-menu-wrapper/libs/constants/constants.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useState,
} from '#libs/hooks/hooks.js';
import {
  STEPS_DEFAULT_ORDER,
  type StepsType,
  type SurveyRequestDto,
  type SurveyState,
  SurveySteps,
} from '#packages/survey/survey.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { RenderSteps } from './components/components.js';
import { ONE_INDEX } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type SurveyForDispatch = SurveyState & { userId?: number };

const Survey: React.FC = () => {
  const { survey } = useAppSelector((state) => {
    return state;
  });
  const [currentStep, setCurrentStep] = useState<StepsType>(
    SurveySteps.PREFERENCES,
  );

  const handleNextStep = useCallback((): void => {
    const index = STEPS_DEFAULT_ORDER.indexOf(currentStep);
    const nextIndex = (index + ONE_INDEX) % STEPS_DEFAULT_ORDER.length;
    const nextCategory = STEPS_DEFAULT_ORDER[nextIndex];
    setCurrentStep(nextCategory as StepsType);
  }, [currentStep]);

  const handlePreviousStep = useCallback((): void => {
    const index = STEPS_DEFAULT_ORDER.indexOf(currentStep);
    const previousIndex = (index - ONE_INDEX) % STEPS_DEFAULT_ORDER.length;
    const previousCategory = STEPS_DEFAULT_ORDER[previousIndex];
    setCurrentStep(previousCategory as StepsType);
  }, [currentStep]);

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

  const handleSubmit = useCallback(() => {
    const surveyForDispatch: SurveyForDispatch = structuredClone(survey);
    surveyForDispatch['userId'] = userId;
    void dispatch(
      authActions.createUserSurvey(surveyForDispatch as SurveyRequestDto),
    );
  }, [dispatch, survey, userId]);

  if (isSurveyCompleted) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  return (
    <div className={styles['container']}>
      <Header routes={SIDEBAR_ROUTES} />
      {surveyPreferencesDataStatus === DataStatus.PENDING ? (
        <Loader isOverflow />
      ) : (
        <div className={styles['survey']}>
          <div className={styles['name']}>
            CalmPal is your trusted companion on the journey to mental
            well-being
          </div>
          <main>
            <RenderSteps
              currentStep={currentStep}
              onNextStep={handleNextStep}
              onPreviousStep={handlePreviousStep}
              onSubmit={handleSubmit}
            />
          </main>
        </div>
      )}
    </div>
  );
};

export { Survey };
