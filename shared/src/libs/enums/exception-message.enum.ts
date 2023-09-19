import { getMegabytesFromBytes } from '#libs/helpers/helpers.js';
import { FileUploadValidationRule } from '#packages/files/files.js';

import { ExceptionRule } from './exception-rule.enum.js';

const ExceptionMessage = {
  INVALID_TOKEN: 'Token is invalid.',
  UNAUTHORIZED_USER: 'User is not authorized.',
  USER_NOT_FOUND: 'User with these credentials was not found.',
  INCORRECT_CREDENTIALS: 'Incorrect credentials.',
  USER_ALREADY_EXISTS: 'User already exists.',
  INCORRECT_FILE_TYPE: `File extension should be one of ${ExceptionRule.UPLOAD_FILE_EXTENSIONS.join(
    ', ',
  )}.`,
  FILE_TOO_BIG: `The inputted file is bigger than ${getMegabytesFromBytes(
    FileUploadValidationRule.MAXIMUM_FILE_SIZE,
  )} MB.`,
} as const;

export { ExceptionMessage };
