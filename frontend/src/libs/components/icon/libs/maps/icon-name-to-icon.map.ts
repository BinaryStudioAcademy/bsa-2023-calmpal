import { ReactComponent as ArrowIcon } from '#assets/icons/arrow.svg';
import { ReactComponent as AudioPlayIcon } from '#assets/icons/audio-player-play.svg';
import { ReactComponent as BackwardIcon } from '#assets/icons/backward.svg';
import { ReactComponent as ChatSideBarIcon } from '#assets/icons/chat.svg';
import { ReactComponent as ChatPageIcon } from '#assets/icons/chat-page.svg';
import { ReactComponent as ChatsIcon } from '#assets/icons/chats.svg';
import { ReactComponent as ForwardIcon } from '#assets/icons/forward.svg';
import { ReactComponent as HomeIcon } from '#assets/icons/home.svg';
import { ReactComponent as JournalIcon } from '#assets/icons/journal.svg';
import { ReactComponent as MeditationIcon } from '#assets/icons/meditation.svg';
import { ReactComponent as NextIcon } from '#assets/icons/next.svg';
import { ReactComponent as PauseIcon } from '#assets/icons/pause.svg';
import { ReactComponent as PlayIcon } from '#assets/icons/play.svg';
import { ReactComponent as PlusIcon } from '#assets/icons/plus.svg';
import { ReactComponent as PreviousIcon } from '#assets/icons/previous.svg';
import { ReactComponent as SendIcon } from '#assets/icons/send.svg';
import { type IconName } from '#libs/types/types.js';

const iconNameToIcon: Record<
  IconName,
  React.FunctionComponent<React.SVGProps<SVGSVGElement>>
> = {
  'backward': BackwardIcon,
  'forward': ForwardIcon,
  'previous': PreviousIcon,
  'next': NextIcon,
  'audio-play-icon': AudioPlayIcon,
  'pause': PauseIcon,
  'arrow': ArrowIcon,
  'plus': PlusIcon,
  'meditation': MeditationIcon,
  'play': PlayIcon,
  'home': HomeIcon,
  'chats': ChatsIcon,
  'journal': JournalIcon,
  'chat-page': ChatPageIcon,
  'chat-sidebar': ChatSideBarIcon,
  'send': SendIcon,
};

export { iconNameToIcon };
