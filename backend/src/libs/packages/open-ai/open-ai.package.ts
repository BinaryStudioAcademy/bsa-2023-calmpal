import { type HTTPService } from '../http/http.js';
import {
  BASE_OPEN_AI_URL,
  DEFAULT_IMAGE_GENERATE_REQUEST,
} from './libs/constants/constants.js';
import {
  type OpenAiImageGenerateRequestDto,
  type OpenAiImageGenerateResponseDto,
  type OpenAiMessageGenerateRequestDto,
  type OpenAiMessageGenerateResponseDto,
} from './libs/types/types.js';

type OpenAiDependencies = {
  httpService: HTTPService;
  apiKey: string;
  model?: string;
};

class OpenAi {
  private apiKey: string;
  private httpService: HTTPService;
  private model: string;

  public constructor({
    httpService,
    apiKey,
    model = 'gpt-3.5-turbo-0301',
  }: OpenAiDependencies) {
    this.httpService = httpService;
    this.apiKey = apiKey;
    this.model = model;
  }

  public async getMessageResponse({
    content,
  }: OpenAiMessageGenerateRequestDto): Promise<string | null> {
    const data = await this.httpService.load<OpenAiMessageGenerateResponseDto>({
      method: 'POST',
      url: `${BASE_OPEN_AI_URL}chat/completions`,
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

  public async generateImage({
    prompt,
    n = DEFAULT_IMAGE_GENERATE_REQUEST.n,
    size = DEFAULT_IMAGE_GENERATE_REQUEST.size,
  }: OpenAiImageGenerateRequestDto): Promise<string | null> {
    const data = await this.httpService.load<OpenAiImageGenerateResponseDto>({
      method: 'POST',
      url: `${BASE_OPEN_AI_URL}images/generations`,
      data: { prompt, n, size },
      token: this.apiKey,
    });

    const [response] = data.data;

    return response?.url ?? null;
  }
}

export { OpenAi };
