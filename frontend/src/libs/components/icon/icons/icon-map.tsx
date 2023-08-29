import { type ValueOf } from '#/libs/types/types.js';
import { IconNameToIcon } from '#libs/enums/enums.js';

import { ReactComponent as Backward } from './backward.svg';
import { ReactComponent as Forward } from './forward.svg';
import { ReactComponent as Next } from './next.svg';
import { ReactComponent as Pause } from './pause.svg';
import { ReactComponent as Play } from './play.svg';
import { ReactComponent as Previous } from './previous.svg';

const iconNameToSvgMap: Record<ValueOf<typeof IconNameToIcon>, JSX.Element> = {
  [IconNameToIcon.BACKWARD]: <Backward />,
  [IconNameToIcon.FORWARD]: <Forward />,
  [IconNameToIcon.PREVIOUS]: <Previous />,
  [IconNameToIcon.NEXT]: <Next />,
  [IconNameToIcon.PLAY]: <Play />,
  [IconNameToIcon.PAUSE]: <Pause />,
};

export { iconNameToSvgMap };
