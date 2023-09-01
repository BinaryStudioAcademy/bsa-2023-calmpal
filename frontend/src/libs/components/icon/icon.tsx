import { iconNameToIcon } from '#libs/maps/maps.js';
import { type IconNames } from '#libs/types/types.js';

type Properties = {
  name: IconNames;
};

const Icon: React.FC<Properties> = ({ name }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon />;
};

export { Icon };
