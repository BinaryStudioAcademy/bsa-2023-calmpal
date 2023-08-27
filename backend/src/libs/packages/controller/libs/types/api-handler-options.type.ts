import { type FileUploadRequestDto } from '#packages/files/libs/types/types.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

type DefaultApiHandlerOptions = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  user?: UserAuthResponseDto;
  fileBuff?: FileUploadRequestDto;
};

type APIHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: T['user'];
  fileBuff: T['fileBuff'];
};

export { type APIHandlerOptions };
