import { type IconName } from '#libs/types/types.js';

import { iconNameToIcon } from './icon-name-to-icon.js';

type Properties = {
  name: IconName;
  color: string;
};

const Icon: React.FC<Properties> = ({ name, color }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon style={{ color }} />;
};

export { Icon };
