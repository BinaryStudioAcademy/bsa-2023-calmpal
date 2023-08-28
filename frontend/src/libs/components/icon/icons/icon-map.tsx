import { type ValueOf } from '#/libs/types/types.js';
import { IconNameToIcon } from '#libs/enums/enums.js';

import { ReactComponent as Arrow } from './arrow.svg';
import { ReactComponent as Plus } from './plus.svg';
import { ReactComponent as TrashBox } from './trash-box.svg';

const iconNameToPlainSvgMap: Record<
  ValueOf<typeof IconNameToIcon>,
  JSX.Element
> = {
  [IconNameToIcon.ARROW]: <Arrow />,
  [IconNameToIcon.PLUS]: <Plus />,
  [IconNameToIcon.TRASHBOX]: <TrashBox />,
};

export { iconNameToPlainSvgMap };
