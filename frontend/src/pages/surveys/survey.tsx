import React from 'react';

import { Header, Loader, Navigate } from '#libs/components/components.js';
import { SIDEBAR_ROUTES } from '#libs/components/navigation-menu-wrapper/libs/constants.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useState,
} from '#libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { SurveySteps } from './libs/survey-steps.map.js';
import styles from './styles.module.scss';

const FIRST = 0;
const ONE = 1;

type SurveyStep = keyof typeof SurveySteps;

const firstStep = Object.keys(SurveySteps)[FIRST] as SurveyStep;

const Survey: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SurveyStep>(firstStep);
  const [isNextStepDisabled, setIsNextStepDisabled] = useState<boolean>(true);

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

  const handleNextStep = (): void => {
    const steps = Object.keys(SurveySteps) as SurveyStep[];
    const index = steps.indexOf(currentStep);
    if (index < steps.length - ONE) {
      setCurrentStep(steps[index + ONE] as SurveyStep);
    } else {
      setCurrentStep(steps[FIRST] as SurveyStep);
    }
  };

  const handlePreviousStep = (): void => {
    const steps = Object.keys(SurveySteps) as SurveyStep[];
    const index = steps.indexOf(currentStep);
    if (index > FIRST) {
      setCurrentStep(steps[index - ONE] as SurveyStep);
    }
  };

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
            <React.Suspense fallback={<Loader />}>
              {React.createElement(SurveySteps[currentStep], {
                handleNextStep,
                handlePreviousStep,
                onSubmit: handleSubmit,
                setIsNextStepDisabled,
                isNextStepDisabled,
              })}
            </React.Suspense>
          </main>
        </div>
      )}
    </div>
  );
};

export { Survey };
