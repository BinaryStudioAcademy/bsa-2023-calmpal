import React from 'react';

import { SignBackground, Text } from '~/libs/components/components';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks';
import { type UserAuthResponseDto } from '~/packages/users/users';
import { actions as authActions } from '~/slices/auth/auth';

import { PreferencesStep } from './components/components';
import { styles } from './styles';

const Survey: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(({ auth }) => {
    return {
      userId: (auth.authenticatedUser as UserAuthResponseDto).id,
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

  return (
    <React.Fragment>
      <SignBackground>
        <Text style={styles.titleText}>What can we help you with?</Text>
        <PreferencesStep onSubmit={handleSubmit} />
      </SignBackground>
    </React.Fragment>
  );
};

export { Survey };
