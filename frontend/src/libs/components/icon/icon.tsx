import { type IconName } from '#libs/enums/enums.js';
import { iconNameToPlainSvgMap } from '#libs/maps/icon-name-to-plain-svg.js';

type Properties = {
  name: IconName;
  color: string;
};

const Icon: React.FC<Properties> = ({ name, color }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  return <SelectedIcon style={{ color }} />;
};

export { Icon };
