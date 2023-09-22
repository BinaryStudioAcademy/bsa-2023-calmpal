import { ContentType } from '#libs/enums/enums.js';

import { BaseHttpApi } from '../api/api.js';
import { type BaseHttp } from '../http/http.js';
import { IMAGE_SIZE } from './libs/constants/constants.js';
import { OpenAiImageSize } from './libs/enums/enums.js';
import {
  type OpenAiImageGenerateRequestDto,
  type OpenAiImageGenerateResponseDto,
  type OpenAiMessageGenerateRequestDto,
  type OpenAiMessageGenerateResponseDto,
} from './libs/types/types.js';

type OpenAiDependencies = {
  apiKey: string;
  baseUrl: string;
  http: BaseHttp;
  model?: string;
};

class OpenAi {
  private apiKey: string;
  private baseUrl: string;
  private model: string;
  private defaultImageGenerateConfig = {
    number: 1,
    size: OpenAiImageSize[IMAGE_SIZE],
  };

  private openAiApi: BaseHttpApi;

  public constructor({
    apiKey,
    baseUrl,
    http,
    model = 'gpt-3.5-turbo-0301',
  }: OpenAiDependencies) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.model = model;

    this.openAiApi = new BaseHttpApi({ baseUrl, http, path: '' });
  }

  public async getMessageResponse(
    messages: OpenAiMessageGenerateRequestDto[],
  ): Promise<string | null> {
    const data = await this.openAiApi.load<OpenAiMessageGenerateResponseDto>(
      `${this.baseUrl}chat/completions`,
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
  }

  public async generateImages({
    prompt,
    number = this.defaultImageGenerateConfig.number,
    size = this.defaultImageGenerateConfig.size,
  }: OpenAiImageGenerateRequestDto): Promise<string | null> {
    const data = await this.openAiApi.load<OpenAiImageGenerateResponseDto>(
      `${this.baseUrl}images/generations`,
      {
        method: 'POST',
        payload: JSON.stringify({ prompt, number, size }),
        token: this.apiKey,
        contentType: ContentType.JSON,
      },
    );

    const [response] = data.data;

    return response?.url ?? null;
  }
}

export { OpenAi };
