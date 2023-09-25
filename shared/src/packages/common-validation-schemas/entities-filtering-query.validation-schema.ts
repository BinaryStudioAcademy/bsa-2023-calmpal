import joi from 'joi';

import { type EntitiesFilteringDto } from '../../libs/types/types.js';

const entitiesFilteringQuery = joi.object<EntitiesFilteringDto, true>({
  query: joi.string(),
});

export { entitiesFilteringQuery };
