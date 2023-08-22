import { Button, Input, Link } from '#libs/components/components.js';
import { AppRoute } from '#libs/enums/app-route.enum.js';
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

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <form onSubmit={handleFormSubmit} className={styles['authForm']}>
        <h1 className={styles['greeting']}>
          Create a free account to save your preferences
        </h1>
        <p>
          <Input
            type="text"
            label="Name"
            placeholder="Please write your name"
            name="fullName"
            control={control}
            errors={errors}
          />
        </p>
        <p>
          <Input
            type="text"
            label="E-mail"
            placeholder="name@gmail.com"
            name="email"
            control={control}
            errors={errors}
          />
        </p>
        <p>
          <Input
            type="password"
            label="Password"
            name="password"
            control={control}
            errors={errors}
          />
        </p>
        <Button
          type="submit"
          label="Sign up"
          className={styles['btn'] as string}
        />
        <span className={styles['authFormLink']}>
          Already have an account? Go to
          <Link to={AppRoute.SIGN_IN}>
            <span className={styles['text']}>Sign in</span>
          </Link>
        </span>
      </form>
    </>
  );
};

export { SignUpForm };
