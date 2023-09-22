import { ContentType } from '#libs/enums/enums.js';

import { BaseHttpApi } from '../api/api.js';
import { type BaseHttp } from '../http/http.js';
import { IMAGE_SIZE } from './libs/constants/constants.js';
import {
  OpenAiApiPath,
  OpenAiChatApiPath,
  OpenAiImagesApiPath,
  OpenAiImageSize,
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
  ): Promise<string | null> {
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
  }

  public async generateImages({
    prompt,
    number = this.defaultImageGenerateConfig.number,
    size = this.defaultImageGenerateConfig.size,
  }: OpenAiImageGenerateRequestDto): Promise<string | null> {
    const data = await this.load<OpenAiImageGenerateResponseDto>(
      this.getFullEndpoint(
        OpenAiApiPath.IMAGES,
        OpenAiImagesApiPath.GENERATIONS,
        {},
      ),
      {
        method: 'POST',
        payload: JSON.stringify({ prompt, n: number, size }),
        token: this.apiKey,
        contentType: ContentType.JSON,
      },
    );
    const [response] = data.data;

    return response?.url ?? null;
  }
}

export { OpenAi };
