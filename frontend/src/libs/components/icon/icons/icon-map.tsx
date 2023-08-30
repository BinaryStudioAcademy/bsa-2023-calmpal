import { type ValueOf } from '#/libs/types/types.js';
import { IconNameToIcon } from '#libs/enums/enums.js';

import { ReactComponent as Arrow } from './arrow.svg';
import { ReactComponent as Avatar } from './avatar.svg';
import { ReactComponent as Plus } from './plus.svg';
import { ReactComponent as SignOut } from './sign-out.svg';

const iconNameToPlainSvgMap: Record<
  ValueOf<typeof IconNameToIcon>,
  JSX.Element
> = {
  [IconNameToIcon.ARROW]: <Arrow />,
  [IconNameToIcon.PLUS]: <Plus />,
  [IconNameToIcon.SIGN_OUT]: <SignOut />,
  [IconNameToIcon.AVATAR]: <Avatar />,
};

export { iconNameToPlainSvgMap };
