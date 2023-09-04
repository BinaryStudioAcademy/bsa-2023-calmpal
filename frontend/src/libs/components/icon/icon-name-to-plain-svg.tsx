import { ReactComponent as ArrowIcon } from '#assets/icons/arrow.svg';
import { ReactComponent as AvatarIcon } from '#assets/icons/avatar.svg';
import { ReactComponent as ChatIcon } from '#assets/icons/chat-logo.svg';
import { ReactComponent as NotificationIcon } from '#assets/icons/notification.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';
import { ReactComponent as SignOutIcon } from '#assets/icons/sign-out.svg';
import { ReactComponent as SubscriptionIcon } from '#assets/icons/subscription.svg';
import { type IconName } from '#libs/enums/enums.js';

const iconNameToPlainSvgMap: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'arrow': ArrowIcon,
  'avatar': AvatarIcon,
  'plus': PlusIcon,
  'sign-out': SignOutIcon,
  'notification': NotificationIcon,
  'subscription': SubscriptionIcon,
  'chat-logo': ChatIcon,
};

export { iconNameToPlainSvgMap };
