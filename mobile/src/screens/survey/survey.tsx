import React from 'react';

import {
  Link,
  Loader,
  SignBackground,
  Text,
} from '#libs/components/components';
import { DataStatus, RootScreenName } from '#libs/enums/enums';
import { useAppDispatch, useAppSelector, useCallback } from '#libs/hooks/hooks';
import { type UserAuthResponseDto } from '#packages/users/users';
import { actions as authActions } from '#slices/auth/auth';

import { PreferencesStep } from './components/components';
import { styles } from './styles';

const Survey: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId, authenticatedUserDataStatus } = useAppSelector(
    ({ auth }) => ({
      userId: (auth.authenticatedUser as UserAuthResponseDto).id,
      authenticatedUserDataStatus: auth.authenticatedUserDataStatus,
    }),
  );

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

  if (authenticatedUserDataStatus === DataStatus.PENDING) {
    return <Loader />;
  }

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
