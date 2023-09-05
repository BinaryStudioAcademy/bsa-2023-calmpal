import { type Message } from './messages.type.js';

type ChatMessage = {
  id: string;
  sender: string;
  messages: Message[];
};

export { type ChatMessage };
