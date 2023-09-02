import { ReactComponent as ChatIcon } from '#assets/icons/chat.svg';
import { ReactComponent as ChatLogo } from '#assets/icons/chat-logo.svg';
import { ReactComponent as SendIcon } from '#assets/icons/send-icon.svg';
import { type IconNames } from '#libs/enums/enums.js';

const iconNameToPlainSvgMap: Record<
  IconNames,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'chat-icon': ChatIcon,
  'send-icon': SendIcon,
  'chat-logo': ChatLogo,
};

export { iconNameToPlainSvgMap };
