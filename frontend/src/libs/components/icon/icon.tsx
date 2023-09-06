import { type IconName } from '#libs/types/types.js';

import { iconNameToPlainSvg } from './icon-name-to-plain-svg.js';

type Properties = {
  name: IconName;
  color: string;
};

const Icon: React.FC<Properties> = ({ name, color }) => {
  const SelectedIcon = iconNameToPlainSvg[name];

  return <SelectedIcon style={{ color }} />;
};

export { Icon };
