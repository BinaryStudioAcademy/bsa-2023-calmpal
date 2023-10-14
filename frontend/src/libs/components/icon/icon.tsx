import { type IconColor } from '~/libs/enums/enums.js';
import { type IconName, type ValueOf } from '~/libs/types/types.js';

import { iconNameToIcon } from './libs/maps/maps.js';

type Properties = {
  name: IconName;
  color?: ValueOf<typeof IconColor> | undefined;
  width?: number | undefined;
  height?: number | undefined;
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
