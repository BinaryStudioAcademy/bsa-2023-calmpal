import {
  type ChatMessageCreateRequestDto,
  type ChatMessagesUrlParameters,
} from './types.js';

type ChatMessageCreatePayload = {
  body: ChatMessageCreateRequestDto;
  options: ChatMessagesUrlParameters;
};

export { type ChatMessageCreatePayload };
