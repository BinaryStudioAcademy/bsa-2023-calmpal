import React from 'react';
import { TextInput } from 'react-native';

import { Button, Label, Link, Text, View } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';

import { styles } from './styles';

type Properties = {
  onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => {
  return (
    <React.Fragment>
      <View style={styles.formContainer}>
        <Label />
        <Text style={styles.titleText}>Sign In to your account</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ACB4D0',
            height: 44,
            padding: 12,
            borderRadius: 8,
            fontSize: 16,
            backgroundColor: 'white',
            marginBottom: 2,
            marginTop: 6,
          }}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ACB4D0',
            height: 44,
            padding: 12,
            borderRadius: 8,
            fontSize: 16,
            backgroundColor: 'white',
            marginBottom: 2,
            marginTop: 6,
          }}
        />
        <Button
          label="Sign in"
          onPress={(): void => {
            // TODO: handle Sign in
          }}
        />
        <Link
          label={
            <React.Fragment>
              Don&apos;t have an account? Go to
              <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
            </React.Fragment>
          }
          to={`/${RootScreenName.SIGN_UP}`}
        />
      </View>
    </React.Fragment>
  );
};

export { SignInForm };
