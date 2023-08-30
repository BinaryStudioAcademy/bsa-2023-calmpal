import { type ValueOf } from '#/libs/types/types.js';
import { IconNameToIcon } from '#libs/enums/enums.js';

import { ReactComponent as PlayIcon } from './play-solid.svg';

const iconNameToPlainSvgMap: Record<
  ValueOf<typeof IconNameToIcon>,
  JSX.Element
> = {
  [IconNameToIcon.PLAY]: <PlayIcon />,
};

export { iconNameToPlainSvgMap };
