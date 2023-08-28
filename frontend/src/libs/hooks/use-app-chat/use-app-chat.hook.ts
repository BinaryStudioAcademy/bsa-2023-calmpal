import { useAppSelector, useCallback } from '#libs/hooks/hooks.js';
import { store } from '#libs/packages/store/store.js';
import { type ChatMessage } from '#libs/types/types.js';
import { addMessage, newMessage } from '#slices/chat/chat.js';

type AppChat = {
  messages: ChatMessage[];
  addMessage: (text: string) => void;
  newMessage: (message: ChatMessage) => void;
};

type State = {
  chat: {
    messages: ChatMessage[];
  };
};

const useAppChat = (): AppChat => {
  const messages: ChatMessage[] = useAppSelector(
    (state: State) => state.chat.messages,
  );
  const dispatch = store.instance.dispatch;

  return {
    messages,
    addMessage: useCallback(
      (text: string): void => {
        void dispatch(addMessage({ text }));
      },
      [dispatch],
    ),
    newMessage: useCallback(
      (message: ChatMessage): void => {
        void dispatch(newMessage({ message }));
      },
      [dispatch],
    ),
  };
};

export { useAppChat };
