import { ReactComponent as ArrowIcon } from '#assets/icons/arrow.svg';
import { ReactComponent as CrossIcon } from '#assets/icons/cross.svg';
import { ReactComponent as DownloadIcon } from '#assets/icons/download.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';
import { ReactComponent as UploadIcon } from '#assets/icons/upload.svg';
import { type IconName } from '#libs/types/types.js';

const iconNameToIcon: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'arrow': ArrowIcon,
  'plus': PlusIcon,
  'cross': CrossIcon,
  'upload': UploadIcon,
  'download': DownloadIcon,
};

export { iconNameToIcon };
