import BackArrowIcon from '#assets/img/icons/back-arrow.svg';
import Backward from '#assets/img/icons/backward.svg';
import BellIcon from '#assets/img/icons/bell.svg';
import ChatIcon from '#assets/img/icons/chat.svg';
import DeleteIcon from '#assets/img/icons/delete.svg';
import Forward from '#assets/img/icons/forward.svg';
import HomeIcon from '#assets/img/icons/home.svg';
import Next from '#assets/img/icons/next.svg';
import Pause from '#assets/img/icons/pause.svg';
import Play from '#assets/img/icons/play.svg';
import PlusIcon from '#assets/img/icons/plus.svg';
import Previous from '#assets/img/icons/previous.svg';
import SignOutIcon from '#assets/img/icons/sign-out.svg';
import UserIcon from '#assets/img/icons/user.svg';
import { type IconName } from '#libs/types/types';

type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

const iconNameToIcon: Record<IconName, SVGIcon> = {
  'bell': BellIcon as SVGIcon,
  'plus': PlusIcon as SVGIcon,
  'chat': ChatIcon as SVGIcon,
  'delete': DeleteIcon as SVGIcon,
  'home': HomeIcon as SVGIcon,
  'back-arrow': BackArrowIcon as SVGIcon,
  'user': UserIcon as SVGIcon,
  'backward': Backward as SVGIcon,
  'forward': Forward as SVGIcon,
  'next': Next as SVGIcon,
  'pause': Pause as SVGIcon,
  'play': Play as SVGIcon,
  'previous': Previous as SVGIcon,
  'sign-out': SignOutIcon as SVGIcon,
};

export { iconNameToIcon };
