import { ReactComponent as ChatPageIcon } from '#assets/icons/chat-page-logo.svg';
import { ReactComponent as ChatSideBarIcon } from '#assets/icons/chat-sidebar-logo.svg';
import { ReactComponent as SendIcon } from '#assets/icons/send-icon.svg';
import { type IconName } from '#libs/types/types.js';

const iconNameToIcon: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'chat-page': ChatPageIcon,
  'chat-sidebar': ChatSideBarIcon,
  'send': SendIcon,
};

export { iconNameToIcon };
