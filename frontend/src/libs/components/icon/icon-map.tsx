import { ReactComponent as BackwardIcon } from '#assets/icons/backward.svg';
import { ReactComponent as ForwardIcon } from '#assets/icons/forward.svg';
import { ReactComponent as NextIcon } from '#assets/icons/next.svg';
import { ReactComponent as PauseIcon } from '#assets/icons/pause.svg';
import { ReactComponent as PlayIcon } from '#assets/icons/play.svg';
import { ReactComponent as PreviousIcon } from '#assets/icons/previous.svg';
import { IconNameToIcon } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

const iconNameToSvgMap: Record<ValueOf<typeof IconNameToIcon>, JSX.Element> = {
  [IconNameToIcon.BACKWARD]: <BackwardIcon />,
  [IconNameToIcon.FORWARD]: <ForwardIcon />,
  [IconNameToIcon.PREVIOUS]: <PreviousIcon />,
  [IconNameToIcon.NEXT]: <NextIcon />,
  [IconNameToIcon.PLAY]: <PlayIcon />,
  [IconNameToIcon.PAUSE]: <PauseIcon />,
};

export { iconNameToSvgMap };
