import { Button, Input, Link } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { useAppForm, useAppSelector, useCallback } from '~/libs/hooks/hooks.js';
import {
  type UserSignInRequestDto,
  userSignInValidationSchema,
} from '~/packages/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  const { isLoading } = useAppSelector(({ auth }) => {
    return {
      isLoading: auth.authDataStatus === DataStatus.PENDING,
    };
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <div className={styles['container']}>
      <h1 className={styles['title']}>Sign in to your account</h1>

      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          type="text"
          label="E-mail"
          placeholder="Enter your e-mail"
          name="email"
          control={control}
          errors={errors}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          name="password"
          control={control}
          errors={errors}
        />

        <div className={styles['submit']}>
          <Button type="submit" label="Sign in" isLoading={isLoading} />
        </div>

        <span>
          Don&apos;t have an account? Go to
          <Link to={AppRoute.SIGN_UP}>
            <span className={styles['text']}>Sign up</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export { SignInForm };
