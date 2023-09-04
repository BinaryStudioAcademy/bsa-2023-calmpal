import { iconNameToPlainSvgMap } from '#libs/components/icon/icon-name-to-plain-svg.js';
import { type IconName } from '#libs/types/types.js';

type Properties = {
  name: IconName;
};

const Icon: React.FC<Properties> = ({ name }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  return <SelectedIcon />;
};

export { Icon };
