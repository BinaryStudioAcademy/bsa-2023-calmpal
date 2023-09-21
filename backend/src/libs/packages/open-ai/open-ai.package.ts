import { type HTTPService } from '../http/http.js';
import { IMAGE_SIZE } from './libs/constants/constants.js';
import { OpenAiImageSize } from './libs/enums/enums.js';
import {
  type OpenAiImageGenerateRequestDto,
  type OpenAiImageGenerateResponseDto,
  type OpenAiMessageGenerateRequestDto,
  type OpenAiMessageGenerateResponseDto,
} from './libs/types/types.js';

type OpenAiDependencies = {
  httpService: HTTPService;
  apiKey: string;
  baseUrl: string;
  model?: string;
};

class OpenAi {
  private apiKey: string;
  private httpService: HTTPService;
  private baseUrl: string;
  private model: string;
  private defaultImageGenerateConfig = {
    number: 1,
    size: OpenAiImageSize[IMAGE_SIZE],
  };

  public constructor({
    httpService,
    apiKey,
    baseUrl,
    model = 'gpt-3.5-turbo-0301',
  }: OpenAiDependencies) {
    this.httpService = httpService;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.model = model;
  }

  public async getMessageResponse({
    content,
  }: OpenAiMessageGenerateRequestDto): Promise<string | null> {
    const data = await this.httpService.load<OpenAiMessageGenerateResponseDto>({
      method: 'POST',
      url: `${this.baseUrl}chat/completions`,
      data: {
        model: this.model,
        messages: [
          {
            role: 'user',
            content,
          },
        ],
      },
      token: this.apiKey,
    });

    const [response] = data.choices;

    return response?.message.content ?? null;
  }

  public async generateImages({
    prompt,
    number = this.defaultImageGenerateConfig.number,
    size = this.defaultImageGenerateConfig.size,
  }: OpenAiImageGenerateRequestDto): Promise<string | null> {
    const data = await this.httpService.load<OpenAiImageGenerateResponseDto>({
      method: 'POST',
      url: `${this.baseUrl}images/generations`,
      data: { prompt, number, size },
      token: this.apiKey,
    });

    const [response] = data.data;

    return response?.url ?? null;
  }
}

export { OpenAi };
