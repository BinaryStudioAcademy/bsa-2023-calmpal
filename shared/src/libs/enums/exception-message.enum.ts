import { ChatMessageValidationRule } from '#packages/chat-messages/chat-messages.js';

const ExceptionMessage = {
  INVALID_TOKEN: 'Token is invalid.',
  UNAUTHORIZED_USER: 'User is not authorized.',
  USER_NOT_FOUND: 'User with these credentials was not found.',
  INCORRECT_CREDENTIALS: 'Incorrect credentials.',
  USER_ALREADY_EXISTS: 'User already exists.',
  USER_WAS_DELETED: 'User was deleted.',
  INCORRECT_FILE_TYPE: 'Content type of the file is not in PNG or JPEG.',
  FILE_TOO_BIG: 'The inputted file is bigger than 10 MB.',
  NOTE_NOT_FOUND: 'Note with such id was not found.',
  JOURNAL_NOT_FOUND: 'Journal with such id was not found.',
  CHAT_NOT_FOUND: 'Chat with such id was not found.',
  MESSAGE_TOO_LONG: `The inputted message has more than ${ChatMessageValidationRule.MAXIMUM_MESSAGE_LENGTH} characters.`,
  DELETE_FAIL: 'Failed to delete user.',
} as const;

export { ExceptionMessage };
