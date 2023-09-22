import {
  DEFAULT_RELATIVE_FORMAT,
  SINGLE_QUOTE,
} from '../constants/constants.js';

const FormatRelativeLocale = {
  yesterday: `${SINGLE_QUOTE}Yesterday${SINGLE_QUOTE}`,
  today: `${SINGLE_QUOTE}Today${SINGLE_QUOTE}`,
  tomorrow: `${SINGLE_QUOTE}Tomorrow${SINGLE_QUOTE}`,
  lastWeek: DEFAULT_RELATIVE_FORMAT,
  nextWeek: DEFAULT_RELATIVE_FORMAT,
  other: DEFAULT_RELATIVE_FORMAT,
} as const;

export { FormatRelativeLocale };
