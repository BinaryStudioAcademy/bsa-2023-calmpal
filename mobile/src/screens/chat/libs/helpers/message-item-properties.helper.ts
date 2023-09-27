import { TimeFormat } from '#libs/enums/enums';
import { getFormattedDate } from '#libs/helpers/helpers';
import { type ChatMessageGetAllItemResponseDto } from '#packages/chat-messages/chat-messages';

import { NEXT_USER, PREVIOUS_USER } from '../constants/constants';

type Properties = {
  messages: ChatMessageGetAllItemResponseDto[];
  currentIndex: number;
};

type MessageItemProperties = {
  isTimeVisible: boolean;
  isDifferentMessageOwner?: boolean;
  currentTime?: string;
};

const messageItemProperties = ({
  messages,
  currentIndex,
}: Properties): MessageItemProperties => {
  const currentMessage = messages[
    currentIndex
  ] as ChatMessageGetAllItemResponseDto;
  const previousMessage: ChatMessageGetAllItemResponseDto | undefined =
    messages[currentIndex - PREVIOUS_USER];
  const nextMessage: ChatMessageGetAllItemResponseDto | undefined =
    messages[currentIndex + NEXT_USER];

  const currentDate = new Date(currentMessage.createdAt);
  const nextDate = new Date(nextMessage?.createdAt as Date);

  const currentTime = getFormattedDate(currentDate, TimeFormat.HH_MM);

  const currentMinutes = currentDate.getMinutes();
  const nextMinutes = nextDate.getMinutes();

  const isDifferentOwnerFromPrevious =
    currentMessage.senderId !== previousMessage?.senderId;

  const isDifferentOwnerFromNext =
    currentMessage.senderId !== nextMessage?.senderId;

  if (currentMinutes === nextMinutes && !isDifferentOwnerFromNext) {
    return {
      isTimeVisible: false,
      isDifferentMessageOwner: isDifferentOwnerFromPrevious,
    };
  }

  return {
    isTimeVisible: true,
    isDifferentMessageOwner: isDifferentOwnerFromPrevious,
    currentTime: currentTime,
  };
};

export { messageItemProperties };
