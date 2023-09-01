import { type ChatScreenName } from '#libs/enums/navigation/chat-screen-name.enum';

type ChatNavigationParameterList = {
  [ChatScreenName.CHAT_LIST]: undefined;
  [ChatScreenName.CHAT]: { title: string };
};

export { type ChatNavigationParameterList };
