import { type JournalScreenName } from '~/libs/enums/enums';

type JournalNavigationParameterList = {
  [JournalScreenName.JOURNAL]: undefined;
  [JournalScreenName.NOTE]: { id: number | null };
};

export { type JournalNavigationParameterList };
