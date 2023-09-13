import { UserRole } from '#libs/enums/enums.js';
import { generateUUID } from '#libs/helpers/helpers.js';
import { type ChatMessage } from '#libs/types/types.js';

const CHAT_INPUT_DEFAULT_VALUES = {
  text: '',
} as const;

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: generateUUID(),
    sender: UserRole.BOT,
    messages: [
      {
        message: 'Hello, I am Doctor Freud 👨‍⚕️. How can I help you?',
        id: generateUUID(),
      },
    ],
  },
  {
    id: generateUUID(),
    sender: UserRole.USER,
    messages: [
      {
        message:
          'Hi, Doctor. I have been feeling really down lately, and I am not sure why. Can you help me? 😢😭',
        id: generateUUID(),
      },
    ],
  },
  {
    id: generateUUID(),
    sender: UserRole.BOT,
    messages: [
      {
        message:
          'Of course! I amm here to support you. 🙂 Can you tell me more about how you have been feeling? Any specific symptoms or changes in your daily life?',
        id: generateUUID(),
      },
    ],
  },
];

export { CHAT_INPUT_DEFAULT_VALUES, MOCK_MESSAGES };
