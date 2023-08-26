import { ChatRole } from '#libs/enums/enums.js';
import { useCallback, useReducer } from '#libs/hooks/hooks.js';
import { type Message } from '#libs/types/types.js';

type MessageReducer = {
  messages: Message[];
  addMessage: (text: string) => void;
  newMessage: (message: Message) => void;
};

const LAST = -1;
const FIRST = 0;

type Action =
  | { type: 'NEW_MESSAGE'; payload: Message }
  | { type: 'ADD_MESSAGE'; payload: string };

const messageReducer = (state: Message[], action: Action): Message[] => {
  switch (action.type) {
    case 'NEW_MESSAGE': {
      if (
        state.length > FIRST &&
        state.at(LAST)?.sender === action.payload.sender
      ) {
        const updatedLastMessage = { ...state.at(LAST) } as Message;
        updatedLastMessage.message.push(
          action.payload.message.at(FIRST) as string,
        );

        return [...state.slice(FIRST, LAST), updatedLastMessage];
      } else {
        return [
          ...state,
          {
            sender: action.payload.sender,
            message: [action.payload.message.at(FIRST) as string],
          },
        ];
      }
    }
    case 'ADD_MESSAGE': {
      if (state.length > FIRST && state.at(LAST)?.sender === ChatRole.USER) {
        const updatedLastMessage = { ...state.at(LAST) } as Message;
        updatedLastMessage.message.push(action.payload);

        return [...state.slice(FIRST, LAST), updatedLastMessage];
      } else {
        return [...state, { sender: ChatRole.USER, message: [action.payload] }];
      }
    }
    default: {
      return state;
    }
  }
};

const useMessageReducer = (): MessageReducer => {
  const [messages, dispatch] = useReducer(messageReducer, []);

  const addMessage = useCallback(
    (text: string): void => {
      dispatch({ type: 'ADD_MESSAGE', payload: text });
    },
    [dispatch],
  );

  const newMessage = useCallback(
    (message: Message): void => {
      dispatch({ type: 'NEW_MESSAGE', payload: message });
    },
    [dispatch],
  );

  return { messages, addMessage, newMessage };
};

export { useMessageReducer };
