import { type ChatMessageGetAllItemResponseDto } from '#packages/chat-messages/chat-messages.js';

const EMPTY_ARRAY_LENGTH = 0;

const CHAT_INPUT_DEFAULT_VALUES = {
  text: '',
} as const;

const MOCK_MESSAGES: ChatMessageGetAllItemResponseDto[] = [
  {
    id: 1,
    chatId: 1,
    message:
      'Hi, Doctor. I have been feeling really down lately, and I am not sure why. Can you help me? 😢😭',
    senderId: 2,
  },
  {
    id: 2,
    chatId: 1,
    message:
      'Of course! I am here to support you. 🙂 Can you tell me more about how you have been feeling? Any specific symptoms or changes in your daily life?',
    senderId: 1,
  },
  {
    id: 3,
    chatId: 1,
    message:
      'I have been experiencing persistent sadness, loss of interest in things I used to enjoy. It is been affecting my work and relationships too!! 💊❌😵',
    senderId: 2,
  },
  {
    id: 4,
    chatId: 1,
    message:
      'Thanks a lot Amanda. Let me try to analyze that and get back to you...',
    senderId: 1,
  },
];

export { CHAT_INPUT_DEFAULT_VALUES, EMPTY_ARRAY_LENGTH, MOCK_MESSAGES };
