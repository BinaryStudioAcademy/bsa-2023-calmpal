import { Header, Loader, Navigate } from '#libs/components/components.js';
import { SIDEBAR_ROUTES } from '#libs/components/navigation-menu-wrapper/libs/constants.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useState,
} from '#libs/hooks/hooks.js';
import {
  type Step,
  STEPS,
  Steps,
  type SurveyRequestDto,
  type SurveyState,
} from '#packages/survey/survey.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { renderSteps } from './components/steps/steps.js';
import { ONE_INDEX } from './libs/constants.js';
import { useSurvey } from './libs/hooks/survey.hooks.js';
import styles from './styles.module.scss';

type SurveyForDispatch = SurveyState & { userId?: number };

const Survey: React.FC = () => {
  const { survey } = useSurvey();
  const [currentStep, setCurrentStep] = useState<Step>(Steps.PREFERENCES);

  const handleNextStep = useCallback((): void => {
    const index = STEPS.indexOf(currentStep);
    const nextIndex = (index + ONE_INDEX) % STEPS.length;
    const nextCategory = STEPS[nextIndex];
    setCurrentStep(nextCategory as Step);
  }, [currentStep]);

  const handlePreviousStep = useCallback((): void => {
    const index = STEPS.indexOf(currentStep);
    const previousIndex = (index - ONE_INDEX) % STEPS.length;
    const previousCategory = STEPS[previousIndex];
    setCurrentStep(previousCategory as Step);
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
        <Loader />
      ) : (
        <div className={styles['survey']}>
          <div className={styles['name']}>
            CalmPal is your trusted companion on the journey to mental
            well-being
          </div>
          <main>
            {renderSteps({
              currentStep,
              handleNextStep,
              handlePreviousStep,
              handleSubmit,
            })}
          </main>
        </div>
      )}
    </div>
  );
};

export { Survey };
