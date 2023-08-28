import { type ValueOf } from '#/libs/types/types.js';
import { IconNameToIcon } from '#libs/enums/enums.js';

import { ReactComponent as Arrow } from './arrow.svg';
import { ReactComponent as Plus } from './plus.svg';

const iconNameToPlainSvgMap: Record<
  ValueOf<typeof IconNameToIcon>,
  JSX.Element
> = {
  [IconNameToIcon.ARROW]: <Arrow />,
  [IconNameToIcon.PLUS]: <Plus />,
};

export { iconNameToPlainSvgMap };
