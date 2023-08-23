import React from 'react';

import { SignBackground, Text } from '#libs/components/components';

import { PreferencesStep } from './components/components';

const Survey: React.FC = () => {
  return (
    <React.Fragment>
      <Text>ITS SURVEY</Text>
      <SignBackground>
        <PreferencesStep />
      </SignBackground>
    </React.Fragment>
  );
};

export { Survey };
