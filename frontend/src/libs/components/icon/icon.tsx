import { type IconName } from '#libs/types/types.js';

import { iconNameToIcon } from './libs/maps/icon-name-to-icon.map.js';

type Properties = {
  name: IconName;
  color?: string;
};

const Icon: React.FC<Properties> = ({ name, color = 'currentColor' }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon style={{ color }} />;
};

export { Icon };
