import React from 'react';

import { Link, SignBackground, Text } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';
import { useAppDispatch, useAppSelector, useCallback } from '#libs/hooks/hooks';
import { type UserAuthResponseDto } from '#packages/users/users';
import { actions as authActions } from '#slices/auth/auth';

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
        <Text style={styles.labelText}>
          <Link label="Sign In" to={`/${RootScreenName.SIGN_IN}`} />
        </Text>
        <PreferencesStep onSubmit={handleSubmit} />
      </SignBackground>
    </React.Fragment>
  );
};

export { Survey };
