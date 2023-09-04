import React from 'react';

import { iconNameToIcon } from '#libs/maps/maps';
import { type IconName } from '#libs/types/types';

type Properties = {
  name: IconName;
  color?: string;
};

const Icon: React.FC<Properties> = ({ name, color }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon color={color} />;
};

export { Icon };
