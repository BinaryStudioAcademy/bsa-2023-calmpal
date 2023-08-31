import { type IconNames } from '#libs/enums/enums.js';
import { getValidClassNames } from '#libs/helpers/helpers.js';
import { iconNameToPlainSvgMap } from '#libs/maps/icon-name-to-plain-svg.map.js';
import { type ClassValue } from '#libs/types/types.js';

type Properties = {
  name: IconNames;
  className?: ClassValue;
};

const Icon: React.FC<Properties> = ({ name, className = '' }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];
  const classNames = getValidClassNames(className as string);

  return (
    <div className={classNames}>
      <SelectedIcon />
    </div>
  );
};

export { Icon };
