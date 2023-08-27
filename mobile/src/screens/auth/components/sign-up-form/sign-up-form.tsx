import React from 'react';

import {
  Button,
  Input,
  Link,
  ScrollView,
  Text,
} from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';
import { useAppForm, useCallback } from '#libs/hooks/hooks';
import { userSignUpValidationSchema } from '#packages/users/libs/validation-schemas/validation-schemas';
import { type UserSignUpRequestDto } from '#packages/users/users';

import { Label } from '../label/label';
import { USER_SIGN_UP_DEFAULT_VALUES } from './libs/constants';
import { styles } from './styles';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: USER_SIGN_UP_DEFAULT_VALUES,
    validationSchema: userSignUpValidationSchema,
  });

  const handleFormSubmit = useCallback((): void => {
    void handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  return (
    <React.Fragment>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <Label />
        <Text style={styles.titleText}>
          Create a free account to save your preferences
        </Text>
        <Input
          control={control}
          errors={errors}
          label="Name"
          name="fullName"
          placeholder="Enter your full name"
        />
        <Input
          control={control}
          errors={errors}
          label="Email"
          name="email"
          placeholder="Enter your email"
        />
        <Input
          control={control}
          errors={errors}
          label="Password"
          name="password"
          isSecure
          placeholder="Enter your password"
        />
        <Button label="Sign up" onPress={handleFormSubmit} />
        <Link
          label={
            <React.Fragment>
              Already have an account? Go to{' '}
              <Text style={styles.linkText}>Sign In</Text>
            </React.Fragment>
          }
          to={`/${RootScreenName.SIGN_IN}`}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export { SignUpForm };
