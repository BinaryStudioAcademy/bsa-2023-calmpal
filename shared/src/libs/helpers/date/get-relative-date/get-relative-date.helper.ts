import { formatRelative } from 'date-fns';
import enGB from 'date-fns/locale/en-GB/index.js';

import { type ValueOf } from '#libs/types/types.js';

import { FormatRelativeLocale } from '../libs/enums/enums.js';

const getRelativeDate = (date: Date): string => {
  const locale = {
    ...enGB,
    formatRelative: (
      token: keyof typeof FormatRelativeLocale,
    ): ValueOf<typeof FormatRelativeLocale> => {
      return FormatRelativeLocale[token];
    },
  };

  return formatRelative(date, new Date(), { locale });
};

export { getRelativeDate };
