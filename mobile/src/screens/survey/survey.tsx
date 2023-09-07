import React from 'react';

import { Loader, SignBackground } from '#libs/components/components';
import { DataStatus } from '#libs/enums/enums';
import { useAppDispatch, useAppSelector, useCallback } from '#libs/hooks/hooks';
import { type UserAuthResponseDto } from '#packages/users/users';
import { actions as authActions } from '#slices/auth/auth';

import { PreferencesStep } from './components/components';

const Survey: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId, surveyPreferencesDataStatus } = useAppSelector(({ auth }) => {
    return {
      userId: (auth.authenticatedUser as UserAuthResponseDto).id,
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

  if (surveyPreferencesDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <SignBackground>
        <PreferencesStep onSubmit={handleSubmit} />
      </SignBackground>
    </React.Fragment>
  );
};

export { Survey };
