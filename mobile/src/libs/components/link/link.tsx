import { Link as UILink } from '@react-navigation/native';
import React, { type ComponentProps, type ReactNode } from 'react';

import { View } from '~/libs/components/components';

import { styles } from './styles';

type Properties = {
  label: ReactNode;
  to: ComponentProps<typeof UILink>['to'];
  style?: object;
  icon?: ReactNode;
};

const Link: React.FC<Properties> = ({ label, to, style, icon }) => {
  const hasIcon = Boolean(icon);

  return (
    <UILink style={[styles.link, style]} to={to}>
      {hasIcon && <View>{icon}</View>}

      {label}
    </UILink>
  );
};

export { Link };
