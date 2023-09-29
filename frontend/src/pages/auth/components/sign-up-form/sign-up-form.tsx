import { Button, Input, Link } from '#libs/components/components.js';
import { AppRoute, DataStatus } from '#libs/enums/enums.js';
import { useAppForm, useAppSelector, useCallback } from '#libs/hooks/hooks.js';
import {
  type UserSignUpRequestDto,
  userSignUpValidationSchema,
} from '#packages/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
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
      <h1 className={styles['title']}>
        Create a free account to save your preferences
      </h1>
      <form onSubmit={handleFormSubmit} className={styles['form']}>
        <Input
          type="text"
          label="Name"
          placeholder="Enter your name"
          name="fullName"
          control={control}
          errors={errors}
        />
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
        <div className={styles['submit-button']}>
          <Button type="submit" label="Sign up" isLoading={isLoading} />
        </div>

        <span>
          Already have an account? Go to
          <Link to={AppRoute.SIGN_IN}>
            <span className={styles['text']}>Sign in</span>
          </Link>
        </span>
      </form>
    </div>
  );
};

export { SignUpForm };
