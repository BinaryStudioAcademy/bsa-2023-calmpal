import { ReactComponent as BackwardIcon } from '#assets/icons/backward.svg';
import { ReactComponent as ForwardIcon } from '#assets/icons/forward.svg';
import { ReactComponent as NextIcon } from '#assets/icons/next.svg';
import { ReactComponent as PauseIcon } from '#assets/icons/pause.svg';
import { ReactComponent as PlayIcon } from '#assets/icons/play.svg';
import { ReactComponent as PreviousIcon } from '#assets/icons/previous.svg';
import { type IconNames } from '#libs/types/types.js';

const iconNameToSvgMap: Record<
  IconNames,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'backward': BackwardIcon,
  'forward': ForwardIcon,
  'previous': PreviousIcon,
  'next': NextIcon,
  'play': PlayIcon,
  'pause': PauseIcon,
};

export { iconNameToSvgMap };
