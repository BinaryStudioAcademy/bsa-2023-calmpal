import { type ChatMessage, type ChatState } from '#libs/types/types.js';

const LAST = -1;
const FIRST = 0;

type StateInfo = {
  state: ChatState;
  sender: string;
  message: string;
};

const isSameUserLastMessage = (state: ChatState, sender: string): boolean =>
  state.messages.at(LAST)?.sender === sender;

const appendLastMessage = (state: ChatState, message: string): void => {
  const updatedLastMessage = {
    ...state.messages.at(LAST),
  } as ChatMessage;
  updatedLastMessage.message.push(message);
  state.messages = [...state.messages.slice(FIRST, LAST), updatedLastMessage];
};

const addMessageToState = ({ state, sender, message }: StateInfo): void => {
  state.messages = [...state.messages, { sender, message: [message] }];
};

const handleMessages = ({ state, sender, message }: StateInfo): void => {
  if (isSameUserLastMessage(state, sender)) {
    appendLastMessage(state, message);
  } else {
    addMessageToState({ state, sender, message });
  }
};

export { handleMessages };
