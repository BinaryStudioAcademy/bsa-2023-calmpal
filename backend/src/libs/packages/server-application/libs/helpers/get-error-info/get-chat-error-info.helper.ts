import { ServerErrorType } from '~/libs/enums/enums.js';
import { type ChatError } from '~/packages/chats/chats.js';

import { type ErrorInfo } from '../../types/types.js';

const getChatErrorInfo = (error: ChatError): ErrorInfo => {
  const { message } = error;
  const status = error.status;

  return {
    status,
    internalMessage: `[Chat Error]: ${status} — ${message}`,
    response: {
      message,
      errorType: ServerErrorType.CHAT,
    },
  };
};

export { getChatErrorInfo };
