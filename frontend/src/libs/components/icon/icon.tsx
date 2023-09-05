import { iconNameToIcon } from '#libs/maps/icon-name-to-plain-svg.js';
import { type ClassValue, type IconName } from '#libs/types/types.js';

type Properties = {
  name: IconName;
  color?: string;
  className?: ClassValue;
};

const Icon: React.FC<Properties> = ({ name, color, className }) => {
  const SelectedIcon = iconNameToIcon[name];

  return <SelectedIcon style={{ color }} className={className as string} />;
};

export { Icon };
