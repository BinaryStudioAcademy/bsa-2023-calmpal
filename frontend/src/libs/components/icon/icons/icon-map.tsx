import { type ValueOf } from '#/libs/types/types.js';
import { ReactComponent as Arrow } from '#assets/icons/arrow.svg';
import { ReactComponent as Plus } from '#assets/icons/plus.svg';
import { ReactComponent as TrashBox } from '#assets/icons/trash-box.svg';
import { IconNameToIcon } from '#libs/enums/enums.js';

const iconNameToPlainSvgMap: Record<
  ValueOf<typeof IconNameToIcon>,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  [IconNameToIcon.ARROW]: Arrow,
  [IconNameToIcon.PLUS]: Plus,
  [IconNameToIcon.TRASHBOX]: TrashBox,
};

export { iconNameToPlainSvgMap };
