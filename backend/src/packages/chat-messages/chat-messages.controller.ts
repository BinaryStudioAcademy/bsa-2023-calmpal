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
import {
  type ChatMessageCreateData,
  type ChatMessageCreateRequestDto,
  type ChatMessagesUrlParameters,
} from './libs/types/types.js';

class ChatMessageController extends BaseController {
  private chatMessageService: ChatMessageService;

  public constructor(logger: Logger, chatMessageService: ChatMessageService) {
    super(logger, APIPath.CHATS);

    this.chatMessageService = chatMessageService;

    this.addRoute({
      path: ChatsApiPath.$CHAT_ID_MESSAGES,
      method: 'POST',
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: ChatMessageCreateRequestDto;
            params: ChatMessagesUrlParameters;
          }>,
        );
      },
    });
    this.addRoute({
      path: ChatsApiPath.$CHAT_ID_MESSAGES,
      method: 'GET',
      handler: (options) => {
        return this.findAllByChatId(
          (
            options as {
              params: ChatMessagesUrlParameters;
            }
          ).params.chat_id,
        );
      },
    });
  }

  private async create(
    options: APIHandlerOptions<{
      body: ChatMessageCreateRequestDto;
      params: ChatMessagesUrlParameters;
    }>,
  ): Promise<APIHandlerResponse> {
    const chatId = options.params.chat_id;
    const chatMessageToCreateData: ChatMessageCreateData = {
      ...options.body,
      chatId,
    };

    return {
      status: HTTPCode.CREATED,
      payload: await this.chatMessageService.create(chatMessageToCreateData),
    };
  }

  public async findAllByChatId(chatId: number): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.chatMessageService.findAllByChatId(chatId),
    };
  }
}

export { ChatMessageController };
