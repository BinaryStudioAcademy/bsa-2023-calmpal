import React from 'react';

import { Text } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';
import {
  useAppDispatch,
  useAppRoute,
  useAppSelector,
  useCallback,
} from '#libs/hooks/hooks';
import { type UserSignUpRequestDto } from '#packages/users/users';
import { actions as authActions } from '#slices/auth/auth';

import { SignInForm, SignUpForm } from './components/components';

const Auth: React.FC = () => {
  const { name } = useAppRoute();
  const dispatch = useAppDispatch();
  const { dataStatus } = useAppSelector(({ auth }) => ({
    dataStatus: auth.dataStatus,
  }));

  const handleSignInSubmit = useCallback(() => {
    // TODO: handle sign in
  }, []);

  const handleSignUpSubmit = useCallback(
    (payload: UserSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload));
    },
    [],
  );

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case RootScreenName.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case RootScreenName.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return (
    <>
      <Text>state: {dataStatus}</Text>
      {getScreen(name)}
    </>
  );
};

export { Auth };
