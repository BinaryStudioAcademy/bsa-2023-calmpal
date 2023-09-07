import { ReactComponent as ArrowIcon } from '#assets/icons/arrow.svg';
import { ReactComponent as ChatsIcon } from '#assets/icons/chats.svg';
import { ReactComponent as CrossIcon } from '#assets/icons/cross.svg';
import { ReactComponent as DownloadIcon } from '#assets/icons/download.svg';
import { ReactComponent as HomeIcon } from '#assets/icons/home.svg';
import { ReactComponent as MeditationIcon } from '#assets/icons/meditation.svg';
import { ReactComponent as PlayIcon } from '#assets/icons/play.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';
import { ReactComponent as UploadIcon } from '#assets/icons/upload.svg';
import { type IconName } from '#libs/types/types.js';

const iconNameToIcon: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'meditation': MeditationIcon,
  'play': PlayIcon,
  'home': HomeIcon,
  'arrow': ArrowIcon,
  'plus': PlusIcon,
  'chats': ChatsIcon,
  'close': CrossIcon,
  'upload': UploadIcon,
  'download': DownloadIcon,
};

export { iconNameToIcon };
