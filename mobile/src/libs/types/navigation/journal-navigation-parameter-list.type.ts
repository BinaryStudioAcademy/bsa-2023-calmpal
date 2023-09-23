import { type JournalScreenName } from '#libs/enums/enums';

type JournalNavigationParameterList = {
  [JournalScreenName.JOURNAL]: undefined;
  [JournalScreenName.NOTE]: { id: number };
};

export { type JournalNavigationParameterList };
