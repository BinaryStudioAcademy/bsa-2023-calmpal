import clsx from 'clsx';

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

      <div className={styles['authName']}>
        <p className={styles['secondary']}>Welcome to</p>
        <p className={styles['primary']}>Calmpal</p>
      </div>
      <div className={styles['overlay']}>{getScreen(pathname)}</div>

      <span className={clsx(styles['shadow'], styles['shadowTopRight'])} />
      <span className={clsx(styles['shadow'], styles['shadowBottomRight'])} />
      <span className={clsx(styles['shadow'], styles['shadowBottomLeft'])} />
      <span
        className={clsx(styles['shadow'], styles['shadowCornerBottomLeft'])}
      />
      <span className={clsx(styles['shadow'], styles['shadowCenter'])} />
      <span className={clsx(styles['bubble'], styles['bubbleBottom'])} />
      <span className={clsx(styles['bubble'], styles['bubbleRight'])} />
      <span className={clsx(styles['bubble'], styles['bubbleCenter'])} />
      <span className={clsx(styles['bubble'], styles['bubbleTop'])} />
    </div>
  );
};

export { Auth };
