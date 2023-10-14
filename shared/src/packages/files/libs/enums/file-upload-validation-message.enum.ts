import { getMegabytesFromBytes } from '~/libs/helpers/helpers.js';

import { FileUploadValidationRule } from './file-upload-validation-rule.enum.js';

const FileUploadValidationMessage = {
  INCORRECT_FILE_TYPE: `File extension should be one of ${FileUploadValidationRule.UPLOAD_FILE_EXTENSIONS.join(
    ', ',
  )}.`,
  FILE_TOO_LARGE: `File size should be less than ${getMegabytesFromBytes(
    FileUploadValidationRule.MAXIMUM_FILE_SIZE,
  )} MB.`,
} as const;

export { FileUploadValidationMessage };
