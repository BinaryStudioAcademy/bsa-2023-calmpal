import { iconNameToSvgMap } from '#libs/maps/icon-name-to-svg.map.js';
import { type IconNames } from '#libs/types/types.js';

type Properties = {
  name: IconNames;
};

const Icon: React.FC<Properties> = ({ name }) => {
  const SelectedIcon = iconNameToSvgMap[name];

  return <SelectedIcon />;
};

export { Icon };
