import backArrow from '#assets/img/icons/back-arrow.svg';
import backward from '#assets/img/icons/backward.svg';
import bell from '#assets/img/icons/bell.svg';
import chat from '#assets/img/icons/chat.svg';
import close from '#assets/img/icons/close.svg';
import download from '#assets/img/icons/download.svg';
import forward from '#assets/img/icons/forward.svg';
import home from '#assets/img/icons/home.svg';
import next from '#assets/img/icons/next.svg';
import pause from '#assets/img/icons/pause.svg';
import play from '#assets/img/icons/play.svg';
import plus from '#assets/img/icons/plus.svg';
import previous from '#assets/img/icons/previous.svg';
import signOut from '#assets/img/icons/sign-out.svg';
import upload from '#assets/img/icons/upload.svg';
import user from '#assets/img/icons/user.svg';
import { type IconName } from '#libs/types/types';

type SVGIcon = React.FC<React.SVGProps<SVGSVGElement>>;

const iconNameToIcon: Record<IconName, SVGIcon> = {
  'bell': bell as SVGIcon,
  'plus': plus as SVGIcon,
  'chat': chat as SVGIcon,
  'home': home as SVGIcon,
  'back-arrow': backArrow as SVGIcon,
  'user': user as SVGIcon,
  'backward': backward as SVGIcon,
  'forward': forward as SVGIcon,
  'next': next as SVGIcon,
  'pause': pause as SVGIcon,
  'play': play as SVGIcon,
  'previous': previous as SVGIcon,
  'sign-out': signOut as SVGIcon,
  'close': close as SVGIcon,
  'upload': upload as SVGIcon,
  'download': download as SVGIcon,
};

export { iconNameToIcon };
