const ExceptionMessage = {
  INVALID_TOKEN: 'Token is invalid.',
  UNAUTHORIZED_USER: 'User is not authorized.',
  USER_NOT_FOUND: 'User with these credentials was not found.',
  INCORRECT_CREDENTIALS: 'Incorrect credentials.',
  USER_ALREADY_EXISTS: 'User already exists.',
  USER_WAS_DELETED: 'User was deleted.',
  NOTE_NOT_FOUND: 'Note with such id was not found.',
  JOURNAL_NOT_FOUND: 'Journal with such id was not found.',
  CHAT_NOT_FOUND: 'Chat with such id was not found.',
  FILE_UPLOAD_FAILED: 'File upload failed.',
} as const;

export { ExceptionMessage };
