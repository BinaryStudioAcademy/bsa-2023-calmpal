import { ReactComponent as PlayIcon } from '#assets/icons//play.svg';
import { ReactComponent as ArrowIcon } from '#assets/icons/arrow.svg';
import { ReactComponent as AvatarIcon } from '#assets/icons/avatar.svg';
import { ReactComponent as NotificationIcon } from '#assets/icons/notification.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';
import { ReactComponent as SignOutIcon } from '#assets/icons/sign-out.svg';
import { ReactComponent as SubscriptionIcon } from '#assets/icons/subscription.svg';
import { type IconName } from '#libs/types/types.js';

const iconNameToPlainSvgMap: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'arrow': ArrowIcon,
  'plus': PlusIcon,
  'sign-out': SignOutIcon,
  'avatar': AvatarIcon,
  'notification': NotificationIcon,
  'subscription': SubscriptionIcon,
  'play': PlayIcon,
};

export { iconNameToPlainSvgMap };
