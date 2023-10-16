import React from 'react';

import { type IconName } from '~/libs/types/types';

import { iconNameToIcon } from './libs/maps/maps';

type Properties = {
  name: IconName;
  color?: string;
};

const Icon: React.FC<Properties> = ({ name, color }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon color={color} />;
};

export { Icon };
