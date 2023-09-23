import joi from 'joi';

import { type GetChatsByQueryDto } from '../types/types.js';

const findByQueryChatEntries = joi.object<GetChatsByQueryDto, true>({
  query: joi.string(),
});

export { findByQueryChatEntries };
