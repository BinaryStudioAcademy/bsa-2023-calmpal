import { ChatMessageValidationRule } from './chat-message-validation-rule.enum.js';

const ChatMessageValidationMessage = {
  MESSAGE_REQUIRED: 'Message is required.',
  USER_ID_IS_REQUIRED: 'User id is required.',
  CHAT_ID_IS_REQUIRED: 'Chat id is required.',
  USER_ID_MUST_BE_NUMBER: 'User id must be a number.',
  CHAT_ID_MUST_BE_NUMBER: 'Chat id must be a number.',
  MAXIMUM_MESSAGE_LENGTH: `Message must be less than or equal to ${ChatMessageValidationRule.MAXIMUM_MESSAGE_LENGTH} characters.`,
} as const;

export { ChatMessageValidationMessage };
