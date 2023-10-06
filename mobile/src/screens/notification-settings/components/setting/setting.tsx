import React, { type ReactNode } from 'react';

import { Text, View } from '#libs/components/components';

import { styles } from './styles';

type Properties = {
  label: string;
  controller: ReactNode;
};

const Setting: React.FC<Properties> = ({ label, controller }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {controller}
    </View>
  );
};

export { Setting };
