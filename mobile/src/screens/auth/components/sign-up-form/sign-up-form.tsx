import React from 'react';

import { Button, Input, Link, Text, View } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';
import { useAppForm } from '#libs/hooks/hooks';
import { type UserSignUpRequestDto } from '#packages/users/users';
import { userSignUpValidationSchema } from '#validation-schemas/validation-schemas';

import { USER_SIGN_UP_DEFAULT_VALUES } from './libs/constants';

type Properties = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};
const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: USER_SIGN_UP_DEFAULT_VALUES,
    validationSchema: userSignUpValidationSchema,
  });

  const handleFormSubmit = (): void => {
    handleSubmit(onSubmit);
  };

  return (
    <View>
      <Text>Sign Up</Text>
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
        placeholder="Enter your password"
      />
      <Button label="Sign up" onPress={handleFormSubmit} />
      <Link label="Go to Sign Up" to={RootScreenName.SIGN_UP} />
    </View>
  );
};

export { SignUpForm };
