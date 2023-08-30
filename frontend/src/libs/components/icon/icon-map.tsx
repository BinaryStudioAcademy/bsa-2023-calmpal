import { type ValueOf } from '#/libs/types/types.js';
import { ReactComponent as ArrowIcon } from '#assets/icons/arrow.svg';
import { ReactComponent as AvatarIcon } from '#assets/icons/avatar.svg';
import { ReactComponent as NotificationIcon } from '#assets/icons/notification.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';
import { ReactComponent as SignOutIcon } from '#assets/icons/sign-out.svg';
import { ReactComponent as SubscriptionIcon } from '#assets/icons/subscription.svg';
import { IconNameToIcon } from '#libs/enums/enums.js';

const iconNameToPlainSvgMap: Record<
  ValueOf<typeof IconNameToIcon>,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  [IconNameToIcon.ARROW]: ArrowIcon,
  [IconNameToIcon.AVATAR]: AvatarIcon,
  [IconNameToIcon.PLUS]: PlusIcon,
  [IconNameToIcon.SIGN_OUT]: SignOutIcon,
  [IconNameToIcon.NOTIFICATION]: NotificationIcon,
  [IconNameToIcon.SUBSCRIPTION]: SubscriptionIcon,
};

export { iconNameToPlainSvgMap };
