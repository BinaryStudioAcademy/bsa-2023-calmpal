import { Loader, Navigate } from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useState,
} from '#libs/hooks/hooks.js';
import {
  type SurveyRequestDto,
  type SurveyState,
  SurveyStep,
  type SurveyStepsType,
} from '#packages/survey/survey.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { SurveySteps } from './components/components.js';
import { ONE_INDEX } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type SurveyForDispatch = SurveyState & { userId?: number };

const Survey: React.FC = () => {
  const { survey } = useAppSelector((state) => {
    return state;
  });
  const defaultOrder = Object.values(SurveyStep);

  const [currentStep, setCurrentStep] = useState<SurveyStepsType>(
    SurveyStep.PREFERENCES,
  );

  const handleNextStep = useCallback((): void => {
    const index = defaultOrder.indexOf(currentStep);
    const nextIndex = (index + ONE_INDEX) % defaultOrder.length;
    const nextCategory = defaultOrder[nextIndex];
    setCurrentStep(nextCategory as SurveyStepsType);
  }, [currentStep, defaultOrder]);

  const handlePreviousStep = useCallback((): void => {
    const index = defaultOrder.indexOf(currentStep);
    const previousIndex = (index - ONE_INDEX) % defaultOrder.length;
    const previousCategory = defaultOrder[previousIndex];
    setCurrentStep(previousCategory as SurveyStepsType);
  }, [currentStep, defaultOrder]);

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
      {surveyPreferencesDataStatus === DataStatus.PENDING ? (
        <Loader isOverflow />
      ) : (
        <div className={styles['survey']}>
          <h2 className={styles['title']}>
            CalmPal is your trusted companion on the journey to mental
            well-being
          </h2>
          <main>
            <SurveySteps
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
