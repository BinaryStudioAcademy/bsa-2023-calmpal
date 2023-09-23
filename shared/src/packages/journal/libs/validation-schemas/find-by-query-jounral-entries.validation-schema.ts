import joi from 'joi';

import { type GetJournalsByQueryDto } from '../types/types.js';

const findByQueryJournalEntries = joi.object<GetJournalsByQueryDto, true>({
  query: joi.string(),
});

export { findByQueryJournalEntries };
