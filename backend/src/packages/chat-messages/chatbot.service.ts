import { type OpenAi } from '#libs/packages/open-ai/open-ai.js';
import { type UserEntity, type UserService } from '#packages/users/users.js';

import { NO_RESPONSE_MESSAGE } from '../chats/libs/constants/constants.js';
import { type OpenAiMessageGenerateRequestDto } from '../chats/libs/types/types.js';

type Constructor = {
  openAiService: OpenAi;
  userService: UserService;
};

class ChatbotService {
  private openAiService: OpenAi;
  private userService: UserService;
  public constructor({ openAiService, userService }: Constructor) {
    this.openAiService = openAiService;
    this.userService = userService;
  }

  public async generateReply(
    payload: OpenAiMessageGenerateRequestDto[],
  ): Promise<string> {
    const reply = await this.openAiService.getMessageResponse(payload);

    return reply ?? NO_RESPONSE_MESSAGE;
  }

  public async getChatbotUser(): Promise<ReturnType<
    UserEntity['toObject']
  > | null> {
    return await this.userService.findByRoleKey('chatbot');
  }
}

export { ChatbotService };
