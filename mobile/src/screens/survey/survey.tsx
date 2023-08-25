import React from 'react';

import { Link, SignBackground, Text } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';

import { PreferencesStep } from './components/components';
import { styles } from './styles';

const Survey: React.FC = () => {
  return (
    <React.Fragment>
      <SignBackground>
        <Text style={styles.labelText}>
          <Link label="Sign In" to={`/${RootScreenName.SIGN_IN}`} />
        </Text>
        <PreferencesStep />
      </SignBackground>
    </React.Fragment>
  );
};

export { Survey };
