import { type ValueOf } from '#/libs/types/types.js';
import { type IconNameToIcon } from '#libs/enums/enums.js';

import { iconNameToPlainSvgMap } from './icons/icon-map.js';

type Properties = {
  name: ValueOf<typeof IconNameToIcon>;
};

const Icon: React.FC<Properties> = ({ name }: Properties) => (
  <>{iconNameToPlainSvgMap[name]}</>
);

export { Icon };
