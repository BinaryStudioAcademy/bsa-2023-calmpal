import { APIPath, ContentType } from '#libs/enums/enums';
import { BaseHttpApi } from '#libs/packages/api/api';
import { type HTTP } from '#libs/packages/http/http';
import { type Storage } from '#libs/packages/storage/storage';
import {
  type SurveyGetAllItemResponseDto,
  type SurveyRequestDto,
} from '#packages/survey/survey';
import {
  type UserAuthResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from '#packages/users/users';

import { AuthApiPath } from './libs/enums/enums';

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

  public async getAuthenticatedUser(): Promise<UserAuthResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.AUTHENTICATED_USER, {}),
      {
        method: 'GET',
        hasAuth: true,
      },
    );

    return await response.json<UserAuthResponseDto>();
  }

  public async createUserSurveyPreferences(
    payload: SurveyRequestDto,
  ): Promise<SurveyGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_UP_SURVEY, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<SurveyGetAllItemResponseDto>();
  }

  public async getUserSurveyPreferences(payload: {
    userId: number;
  }): Promise<SurveyGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AuthApiPath.SIGN_UP_SURVEY, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: false,
      },
    );

    return await response.json<SurveyGetAllItemResponseDto>();
  }
}

export { AuthApi };
