import { type ChatScreenName } from '#libs/enums/enums';

type ChatNavigationParameterList = {
  [ChatScreenName.CHAT_LIST]: undefined;
  [ChatScreenName.CHAT]: { title: string; id: string | undefined };
};

export { type ChatNavigationParameterList };
