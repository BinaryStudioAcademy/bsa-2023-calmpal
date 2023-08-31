import { type IconNameToIcon } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

import { iconNameToPlainSvgMap } from './icon-map.js';

type Properties = {
  name: ValueOf<typeof IconNameToIcon>;
};

const Icon: React.FC<Properties> = ({ name }) => {
  const SelectedIcon = iconNameToPlainSvgMap[name];

  return <SelectedIcon />;
};

export { Icon };
