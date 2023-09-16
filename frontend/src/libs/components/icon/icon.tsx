import { type IconName } from '#libs/types/types.js';

import { iconNameToIcon } from './libs/maps/icon-name-to-icon.map.js';

type Properties = {
  name: IconName;
  color?: string;
  width?: number;
  height?: number;
};

const Icon: React.FC<Properties> = ({
  name,
  color = 'currentColor',
  width,
  height,
}) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon style={{ color }} width={width} height={height} />;
};

export { Icon };
