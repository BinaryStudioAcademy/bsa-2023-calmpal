import { ReactComponent as ArrowIcon } from '#assets/icons/arrow.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';
import { type IconName } from '#libs/enums/enums.js';

const iconNameToIcon: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'arrow': ArrowIcon,
  'plus': PlusIcon,
};

export { iconNameToIcon };
