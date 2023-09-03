import { type IconName } from '#libs/enums/enums.js';
import { iconNameToPlainSvgMap } from '#libs/maps/icon-name-to-plain-svg.map.js';
import { type ClassValue } from '#libs/types/types.js';

type Properties = {
  name: IconName;
  className?: ClassValue;
};

const Icon: React.FC<Properties> = ({ name, className = '' }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  return (
    <div className={className as string}>
      <SelectedIcon />
    </div>
  );
};

export { Icon };
