import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '#libs/hooks/hooks.js';
import { type ChatMessage } from '#libs/types/types.js';
import { newMessage } from '#slices/chat/chat.js';

type AppChat = {
  messages: ChatMessage[];
  newMessage: (message: ChatMessage) => void;
};

type State = {
  chat: {
    messages: ChatMessage[];
  };
};

const useAppChat = (): AppChat => {
  const messages: ChatMessage[] = useAppSelector((state: State) => {
    return state.chat.messages;
  });
  const dispatch = useAppDispatch();

  return {
    messages,
    newMessage: useCallback(
      (message: ChatMessage): void => {
        void dispatch(newMessage({ message }));
      },
      [dispatch],
    ),
  };
};

export { useAppChat };
