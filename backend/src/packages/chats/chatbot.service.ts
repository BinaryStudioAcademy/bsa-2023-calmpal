import { type OpenAi } from '#libs/packages/open-ai/open-ai.js';

import { NO_RESPONSE } from './libs/constants/constants.js';
import { type OpenAiMessageGenerateRequestDto } from './libs/types/types.js';

class ChatbotService {
  private openAiService: OpenAi;
  //TODO: add chat service
  public constructor(openAi: OpenAi) {
    this.openAiService = openAi;
  }

  public async generateReply({
    content,
  }: OpenAiMessageGenerateRequestDto): Promise<string | undefined> {
    //TODO save message using chat/message services

    return (
      (await this.openAiService.getMessageResponse({ content })) ?? NO_RESPONSE
    );
  }
}

export { ChatbotService };
