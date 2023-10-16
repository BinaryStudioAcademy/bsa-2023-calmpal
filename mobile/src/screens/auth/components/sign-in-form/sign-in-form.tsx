import React from 'react';

import {
  Button,
  Input,
  Link,
  ScrollView,
  Text,
} from '~/libs/components/components';
import { RootScreenName } from '~/libs/enums/enums';
import { useAppForm, useCallback } from '~/libs/hooks/hooks';
import { type UserSignInRequestDto } from '~/packages/users/users';
import { userSignInValidationSchema } from '~/packages/users/users';

import { Label } from '../label/label';
import { USER_SIGN_IN_DEFAULT_VALUE } from './libs/constants';
import { styles } from './styles';

type Properties = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: USER_SIGN_IN_DEFAULT_VALUE,
    validationSchema: userSignInValidationSchema,
  });

  const handleFormSubmit = useCallback((): void => {
    void handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return (
    <React.Fragment>
      <ScrollView style={styles.formContainer}>
        <Label />
        <Text style={styles.titleText}>Sign in to your account</Text>
        <Input
          control={control}
          errors={errors}
          label="E-mail"
          name="email"
          placeholder="Enter your e-mail"
        />
        <Input
          control={control}
          errors={errors}
          label="Password"
          name="password"
          isSecure
          placeholder="Enter your password"
        />
        <Button label="Sign in" onPress={handleFormSubmit} />
        <Link
          label={
            <Text style={styles.bottomText}>
              Don&apos;t have an account? Go to{' '}
              <Text style={styles.boldText}>Sign up</Text>
            </Text>
          }
          to={`/${RootScreenName.SIGN_UP}`}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export { SignInForm };
