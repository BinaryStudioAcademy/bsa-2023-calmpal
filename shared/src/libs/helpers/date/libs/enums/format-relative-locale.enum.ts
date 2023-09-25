import { SINGLE_QUOTE_UNICODE } from '../constants/constants.js';
import { TimeFormat } from './time-format.enum.js';

const FormatRelativeLocale = {
  yesterday: `${SINGLE_QUOTE_UNICODE}Yesterday${SINGLE_QUOTE_UNICODE}`,
  today: `${SINGLE_QUOTE_UNICODE}Today${SINGLE_QUOTE_UNICODE}`,
  tomorrow: `${SINGLE_QUOTE_UNICODE}Tomorrow${SINGLE_QUOTE_UNICODE}`,
  lastWeek: TimeFormat.D_MMMM_YYYY,
  nextWeek: TimeFormat.D_MMMM_YYYY,
  other: TimeFormat.D_MMMM_YYYY,
} as const;

export { FormatRelativeLocale };
