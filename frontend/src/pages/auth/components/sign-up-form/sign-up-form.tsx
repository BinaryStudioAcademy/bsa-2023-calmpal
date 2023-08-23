import { Button, Input, Link } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/enums.js';
import { useAppForm, useCallback } from '#libs/hooks/hooks.js';
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

  const handleFormSubmit = useCallback(
    (event: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event);
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
          placeholder="Please write your name"
          name="fullName"
          control={control}
          errors={errors}
        />
        <Input
          type="text"
          label="E-mail"
          placeholder="Enter your email"
          name="email"
          control={control}
          errors={errors}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          control={control}
          errors={errors}
        />
        <Button
          type="submit"
          label="Sign up"
          className={styles['submit'] as string}
        />
        <span className={styles['form-link']}>
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
