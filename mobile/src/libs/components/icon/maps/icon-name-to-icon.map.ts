import BackArrowIcon from '#assets/img/icons/back-arrow.svg';
import BellIcon from '#assets/img/icons/bell.svg';
import ChatIcon from '#assets/img/icons/chat.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import PlusIcon from '#assets/img/icons/plus.svg';
import UserIcon from '#assets/img/icons/user.svg';
import { type IconName } from '#libs/types/types';

type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

const iconNameToIcon: Record<IconName, SVGIcon> = {
  'bell': BellIcon as SVGIcon,
  'plus': PlusIcon as SVGIcon,
  'chat': ChatIcon as SVGIcon,
  'home': HomeIcon as SVGIcon,
  'back-arrow': BackArrowIcon as SVGIcon,
  'user': UserIcon as SVGIcon,
};

export { iconNameToIcon };
