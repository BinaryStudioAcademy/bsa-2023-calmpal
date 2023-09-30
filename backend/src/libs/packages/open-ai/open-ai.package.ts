import { ContentType } from '#libs/enums/enums.js';
import { ChatError } from '#libs/exceptions/exceptions.js';
import { type ValueOf } from '#libs/types/types.js';

import { BaseHttpApi } from '../api/api.js';
import { type BaseHttp, HTTPCode, HTTPError } from '../http/http.js';
import { IMAGE_SIZE } from './libs/constants/constants.js';
import {
  OpenAiApiPath,
  OpenAiChatApiPath,
  OpenAiImagesApiPath,
  OpenAiImageSize,
  type OpenAiResponseFormat,
} from './libs/enums/enums.js';
import {
  type OpenAiImageGenerateRequestDto,
  type OpenAiImageGenerateResponseDto,
  type OpenAiMessageGenerateRequestDto,
  type OpenAiMessageGenerateResponseDto,
} from './libs/types/types.js';

type Constructor = {
  apiKey: string;
  baseUrl: string;
  http: BaseHttp;
  model?: string;
};

class OpenAi extends BaseHttpApi {
  private apiKey: string;
  private model: string;
  private defaultImageGenerateConfig = {
    number: 1,
    size: OpenAiImageSize[IMAGE_SIZE],
    responseFormat: 'b64_json' as ValueOf<typeof OpenAiResponseFormat>,
  };

  public constructor({
    apiKey,
    baseUrl,
    http,
    model = 'gpt-3.5-turbo-0301',
  }: Constructor) {
    super({ path: '', baseUrl, http });
    this.apiKey = apiKey;
    this.model = model;
  }

  public async getMessageResponse(
    messages: OpenAiMessageGenerateRequestDto[],
  ): Promise<string | null | undefined> {
    try {
      const data = await this.load<OpenAiMessageGenerateResponseDto>(
        this.getFullEndpoint(
          OpenAiApiPath.CHAT,
          OpenAiChatApiPath.COMPLETIONS,
          {},
        ),
        {
          method: 'POST',
          payload: JSON.stringify({
            model: this.model,
            messages,
          }),
          token: this.apiKey,
          contentType: ContentType.JSON,
        },
      );

      const [response] = data.choices;

      return response?.message.content ?? null;
    } catch (error: unknown) {
      this.throwError(error);
    }
  }

  public async generateImages({
    prompt,
    number = this.defaultImageGenerateConfig.number,
    size = this.defaultImageGenerateConfig.size,
  }: OpenAiImageGenerateRequestDto): Promise<string | null> {
    try {
      const data = await this.load<OpenAiImageGenerateResponseDto>(
        this.getFullEndpoint(
          OpenAiApiPath.IMAGES,
          OpenAiImagesApiPath.GENERATIONS,
          {},
        ),
        {
          method: 'POST',
          payload: JSON.stringify({
            prompt,
            n: number,
            size,
            response_format: this.defaultImageGenerateConfig.responseFormat,
          }),
          token: this.apiKey,
          contentType: ContentType.JSON,
        },
      );

      const [response] = data.data;

      return response?.b64_json ?? null;
    } catch (error: unknown) {
      this.throwError(error);
    }
  }

  private throwError(error: unknown): never {
    if (error instanceof HTTPError) {
      if (error.status === HTTPCode.UNAUTHORIZED) {
        throw new ChatError({
          message: error.message,
          status: HTTPCode.BAD_REQUEST,
        });
      }

      throw new ChatError({ message: error.message, status: error.status });
    }

    throw new ChatError({});
  }
}

export { OpenAi };
