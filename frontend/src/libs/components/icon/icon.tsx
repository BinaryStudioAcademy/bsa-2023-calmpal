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

  const svgProperties = {
    color,
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  };

  return <SelectedIcon style={{ ...svgProperties }} />;
};

export { Icon };
