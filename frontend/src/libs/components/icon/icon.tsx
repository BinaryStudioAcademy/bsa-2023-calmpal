import { type ValueOf } from '#/libs/types/types.js';
import { type IconNameToIcon } from '#libs/enums/enums.js';

import { iconNameToSvgMap } from './icons/icon-map.js';

type Properties = {
  name: ValueOf<typeof IconNameToIcon>;
};

const Icon: React.FC<Properties> = ({ name }) => <>{iconNameToSvgMap[name]}</>;

export { Icon };
