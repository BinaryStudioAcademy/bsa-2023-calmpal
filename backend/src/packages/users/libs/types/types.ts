import { type RelationType } from 'objection';

import { type AbstractModel } from '#libs/packages/database/database.js';

type RelationMappingsType = Record<
  string,
  {
    relation: RelationType;
    modelClass: typeof AbstractModel;
    join: {
      from: string;
      to: string;
    };
  }
>;

export {
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from 'shared/build/index.js';
export { type RelationMappingsType };
export { type UserInsertData } from './user-insert-data.type.js';
