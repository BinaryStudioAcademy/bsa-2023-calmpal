import { type IconNames } from '#libs/enums/enums.js';
import { iconNameToPlainSvgMap } from '#libs/maps/icon-name-to-plain-svg.js';

type Properties = {
  name: IconNames;
};

const Icon: React.FC<Properties> = ({ name }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  return <SelectedIcon />;
};

export { Icon };
