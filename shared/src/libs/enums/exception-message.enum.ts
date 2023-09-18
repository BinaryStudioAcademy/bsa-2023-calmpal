import { FileUploadValidationRule } from '#packages/files/files.js';

const BYTES_IN_MEGABYTE = 1_000_000;

const ExceptionMessage = {
  INVALID_TOKEN: 'Token is invalid.',
  UNAUTHORIZED_USER: 'User is not authorized.',
  USER_NOT_FOUND: 'User with these credentials was not found.',
  INCORRECT_CREDENTIALS: 'Incorrect credentials.',
  USER_ALREADY_EXISTS: 'User already exists.',
  INCORRECT_FILE_TYPE: 'Content type of the file is not in PNG, JPEG or MPEG.',
  FILE_TOO_BIG: `The inputted file is bigger than ${Math.floor(
    FileUploadValidationRule.MAXIMUM_FILE_SIZE / BYTES_IN_MEGABYTE,
  )} MB.`,
} as const;

export { ExceptionMessage };
