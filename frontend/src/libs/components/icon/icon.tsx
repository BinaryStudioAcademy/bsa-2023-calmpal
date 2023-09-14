import { type IconName } from '#libs/types/types.js';

import { iconNameToIcon } from './libs/maps/icon-name-to-icon.map.js';

type Properties = {
  name: IconName;
  color?: string;
  width?: string | number;
  height?: string | number;
};

const Icon: React.FC<Properties> = ({
  name,
  color = 'currentColor',
  width,
  height,
}) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon style={{ color, width, height }} />;
};

export { Icon };
