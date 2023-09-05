import { ReactComponent as ArrowIcon } from '#assets/icons/arrow.svg';
import { ReactComponent as ChatPageIcon } from '#assets/icons/chat-page-logo.svg';
import { ReactComponent as ChatSideBarIcon } from '#assets/icons/chat-sidebar-logo.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';
import { ReactComponent as SendIcon } from '#assets/icons/send-icon.svg';
import { type IconName } from '#libs/types/types.js';

const iconNameToIcon: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'arrow': ArrowIcon,
  'plus': PlusIcon,
  'chat-page': ChatPageIcon,
  'chat-sidebar': ChatSideBarIcon,
  'send': SendIcon,
};

export { iconNameToIcon };
