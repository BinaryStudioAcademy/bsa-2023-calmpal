import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';

import { type ChatMessageService } from './chat-message.service.js';
import { ChatsApiPath } from './libs/enums/enums.js';
import { type ChatMessageCreateRequestDto } from './libs/types/types.js';

class ChatMessageController extends BaseController {
  private chatMessageService: ChatMessageService;

  public constructor(logger: Logger, chatMessageService: ChatMessageService) {
    super(logger, APIPath.CHATS);

    this.chatMessageService = chatMessageService;

    this.addRoute({
      path: ChatsApiPath.CREATE_MESSAGE,
      method: 'POST',
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: ChatMessageCreateRequestDto;
          }>,
        );
      },
    });
  }

  private async create(
    options: APIHandlerOptions<{
      body: ChatMessageCreateRequestDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.CREATED,
      payload: await this.chatMessageService.create(options.body),
    };
  }
}

export { ChatMessageController };
