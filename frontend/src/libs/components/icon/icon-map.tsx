import { type ValueOf } from '#/libs/types/types.js';
import { ReactComponent as Arrow } from '#assets/icons/arrow.svg';
import { ReactComponent as Avatar } from '#assets/icons/avatar.svg';
import { ReactComponent as Plus } from '#assets/icons/plus.svg';
import { ReactComponent as SignOut } from '#assets/icons/sign-out.svg';
import { IconNameToIcon } from '#libs/enums/enums.js';

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
