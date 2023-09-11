import React from 'react';

import { type IconName } from '#libs/types/types';

import { iconNameToIcon } from './libs/maps/maps';

type Properties = {
  name: IconName;
  color?: string;
  styles?: React.CSSProperties;
};

const Icon: React.FC<Properties> = ({ name, color, styles }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon color={color} style={styles} />;
};

export { Icon };
