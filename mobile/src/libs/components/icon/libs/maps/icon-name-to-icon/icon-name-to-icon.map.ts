import BackArrow from '~/assets/img/icons/back-arrow.svg';
import Backward from '~/assets/img/icons/backward.svg';
import Bell from '~/assets/img/icons/bell.svg';
import Chat from '~/assets/img/icons/chat.svg';
import Close from '~/assets/img/icons/close.svg';
import Delete from '~/assets/img/icons/delete.svg';
import Download from '~/assets/img/icons/download.svg';
import Forward from '~/assets/img/icons/forward.svg';
import Home from '~/assets/img/icons/home.svg';
import Next from '~/assets/img/icons/next.svg';
import Pause from '~/assets/img/icons/pause.svg';
import Play from '~/assets/img/icons/play.svg';
import Plus from '~/assets/img/icons/plus.svg';
import Previous from '~/assets/img/icons/previous.svg';
import SignOut from '~/assets/img/icons/sign-out.svg';
import Upload from '~/assets/img/icons/upload.svg';
import User from '~/assets/img/icons/user.svg';
import { type IconName } from '~/libs/types/types';

type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

const iconNameToIcon: Record<IconName, SVGIcon> = {
  'bell': Bell as SVGIcon,
  'plus': Plus as SVGIcon,
  'chat': Chat as SVGIcon,
  'delete': Delete as SVGIcon,
  'home': Home as SVGIcon,
  'back-arrow': BackArrow as SVGIcon,
  'user': User as SVGIcon,
  'backward': Backward as SVGIcon,
  'forward': Forward as SVGIcon,
  'next': Next as SVGIcon,
  'pause': Pause as SVGIcon,
  'play': Play as SVGIcon,
  'previous': Previous as SVGIcon,
  'sign-out': SignOut as SVGIcon,
  'close': Close as SVGIcon,
  'upload': Upload as SVGIcon,
  'download': Download as SVGIcon,
};

export { iconNameToIcon };
