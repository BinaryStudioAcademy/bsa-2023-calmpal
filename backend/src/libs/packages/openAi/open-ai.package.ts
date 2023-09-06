import { type HTTPService } from '../http/http.js';
import { EMPTY_ARRAY_LENGTH } from './libs/constants/constants.js';
import {
  type OpenAiImageGenerateRequestDto,
  type OpenAiImageGenerateResponseDto,
  type OpenAiMessageGenerateRequestDto,
  type OpenAiMessageGenerateResponseDto,
} from './libs/types/types.js';

class OpenAi {
  private apiKey: string;
  private httpService: HTTPService;

  public constructor(httpService: HTTPService, apiKey: string) {
    this.httpService = httpService;
    this.apiKey = apiKey;
  }

  public async getMessageResponse({
    content,
  }: OpenAiMessageGenerateRequestDto): Promise<string | undefined> {
    const data = await this.httpService.load<OpenAiMessageGenerateResponseDto>({
      method: 'POST',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-3.5-turbo-0301',
        messages: [
          {
            role: 'user',
            content,
          },
        ],
      },
      token: this.apiKey,
    });

    return data.choices.length === EMPTY_ARRAY_LENGTH
      ? undefined
      : data.choices[EMPTY_ARRAY_LENGTH]?.message.content;
  }

  public async generateImage({
    prompt,
    n,
    size,
  }: OpenAiImageGenerateRequestDto): Promise<string | undefined> {
    const data = await this.httpService.load<OpenAiImageGenerateResponseDto>({
      method: 'POST',
      url: 'https://api.openai.com/v1/images/generations',
      data: { prompt, n, size },
      token: this.apiKey,
    });

    return data.data.length === EMPTY_ARRAY_LENGTH
      ? undefined
      : data.data[EMPTY_ARRAY_LENGTH]?.url;
  }
}

export { OpenAi };
