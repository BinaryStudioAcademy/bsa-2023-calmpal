import { type OpenAi } from '#libs/packages/open-ai/open-ai.js';

import { NO_RESPONSE_MESSAGE } from './libs/constants/constants.js';
import { type OpenAiMessageGenerateRequestDto } from './libs/types/types.js';

class ChatbotService {
  private openAiService: OpenAi;
  //TODO: add chat service
  public constructor({ openAi }: { openAi: OpenAi }) {
    this.openAiService = openAi;
  }

  public async generateReply({
    content,
  }: OpenAiMessageGenerateRequestDto): Promise<string | null> {
    //TODO save message using chat/message services

    const reply = await this.openAiService.getMessageResponse({ content });

    return reply ?? NO_RESPONSE_MESSAGE;
  }
}

export { ChatbotService };
