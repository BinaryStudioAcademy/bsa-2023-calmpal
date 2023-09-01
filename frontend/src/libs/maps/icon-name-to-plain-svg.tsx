import { ReactComponent as ArrowIcon } from '#assets/icons/arrow.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';
import { ReactComponent as TrashBoxIcon } from '#assets/icons/trash-box.svg';
import { type IconName } from '#libs/enums/enums.js';

const iconNameToPlainSvgMap: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'arrow': ArrowIcon,
  'plus': PlusIcon,
  'trash-box': TrashBoxIcon,
};

export { iconNameToPlainSvgMap };
