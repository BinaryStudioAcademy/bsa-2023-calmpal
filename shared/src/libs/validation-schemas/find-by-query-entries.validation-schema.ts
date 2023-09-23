import joi from 'joi';

import { type GetItemsByQueryDto } from '#index.js';

const findByQueryEntries = joi.object<GetItemsByQueryDto, true>({
  query: joi.string(),
});

export { findByQueryEntries };
