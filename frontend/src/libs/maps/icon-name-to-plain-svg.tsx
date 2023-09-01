import { ReactComponent as HomeIcon } from '#assets/icons/home.svg';
import { ReactComponent as LogoIcon } from '#assets/icons/logo.svg';
import { ReactComponent as MeditationIcon } from '#assets/icons/meditation.svg';
import { ReactComponent as PlayIcon } from '#assets/icons/play.svg';
import { type IconName } from '#libs/types/types.js';

const iconNameToIcon: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'meditation': MeditationIcon,
  'play': PlayIcon,
  'logo': LogoIcon,
  'home': HomeIcon,
};

export { iconNameToIcon };
