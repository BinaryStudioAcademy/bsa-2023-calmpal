import { type ClassValue, type IconName } from '#libs/types/types.js';

import { iconNameToPlainSvgMap } from './icon-name-to-plain-svg.js';

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
