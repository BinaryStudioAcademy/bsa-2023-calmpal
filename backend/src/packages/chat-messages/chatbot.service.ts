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

  public async generateReply({
    content,
  }: OpenAiMessageGenerateRequestDto): Promise<string> {
    const reply = await this.openAiService.getMessageResponse({
      content: `Pretend that you a psychologist and you give mental support to the patient - answer this question: '${content}'.`,
    });

    return reply ?? NO_RESPONSE_MESSAGE;
  }

  public async getChatbotUser(): Promise<ReturnType<
    UserEntity['toObject']
  > | null> {
    const CHATBOT_ROLE_ID = 1;

    return await this.userService.findByRoleId(CHATBOT_ROLE_ID);
  }
}

export { ChatbotService };
