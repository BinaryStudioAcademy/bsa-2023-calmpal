import { type ContentType } from '~/libs/enums/enums.js';
import { type HTTPOptions } from '~/libs/packages/http/libs/types/types.js';
import { type ValueOf } from '~/libs/types/types.js';

type HTTPApiOptions = Omit<HTTPOptions, 'headers' | 'payload'> & {
  token?: string;
  contentType?: ValueOf<typeof ContentType>;
  payload?: HTTPOptions['payload'];
};

export { type HTTPApiOptions };
