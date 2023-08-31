import { type IconNameToIcon } from '#libs/enums/enums.js';
import { iconNameToPlainSvgMap } from '#libs/maps/icon-name-to-plain-svg.js';
import { type ValueOf } from '#libs/types/types.js';

type Properties = {
  name: ValueOf<typeof IconNameToIcon>;
};

const Icon: React.FC<Properties> = ({ name }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  return <SelectedIcon />;
};

export { Icon };
