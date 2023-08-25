import { AppRoute } from '#libs/enums/enums.js';
import { useAppDispatch, useCallback, useLocation } from '#libs/hooks/hooks.js';
import {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from '#packages/users/users.js';
import { actions as authActions } from '#slices/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleSignInSubmit = useCallback(
    (payload: UserSignInRequestDto): void => {
      void dispatch(authActions.signIn(payload));
    },
    [dispatch],
  );

  const handleSignUpSubmit = useCallback(
    (payload: UserSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload));
    },
    [dispatch],
  );

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return (
    <div className={styles['auth']}>
      <div className={styles['logo']}>Calmpal</div>
      <div className={styles['auth-name']}>
        <p className={styles['secondary']}>Welcome to</p>
        <p className={styles['primary']}>Calmpal</p>
      </div>
      <div className={styles['overlay']}>{getScreen(pathname)}</div>
    </div>
  );
};

export { Auth };
