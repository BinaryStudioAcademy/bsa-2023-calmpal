import { APIPath, ContentType } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';
import {
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '#packages/users/users.js';

import { AuthApiPath } from './libs/enums/enums.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class AuthApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.AUTH, baseUrl, http, storage });
  }

  public async signUp(
    payload: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_UP, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<UserSignUpResponseDto>();
  }

  public async signIn(
    payload: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_IN, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    if (!response.ok) {
      const error = await response.json<{ code: number; message: string }>();
      throw new Error(error.message);
    }

    return await response.json<UserSignInResponseDto>();
  }
}

export { AuthApi };
