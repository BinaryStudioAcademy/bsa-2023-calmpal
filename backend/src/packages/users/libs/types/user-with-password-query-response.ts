import { type UserCommonQueryResponse } from './user-common-query-response.js';

type UserWithPasswordQueryResponse = UserCommonQueryResponse & {
  passwordHash: string;
  passwordSalt: string;
};

export { type UserWithPasswordQueryResponse };
