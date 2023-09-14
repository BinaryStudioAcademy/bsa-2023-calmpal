import { APIPath } from '#libs/enums/enums.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatService } from './chat.service.js';
import { MOCKED_CHAT_NAME } from './libs/constants/constants.js';
import { ChatsApiPath } from './libs/enums/enums.js';
import { type ChatCreateRequestDto } from './libs/types/types.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      ChatMember:
 *        type: object
 *        properties:
 *         id:
 *           type: number
 *           format: number
 *           minimum: 1
 *         userId:
 *           type: number
 *           format: number
 *           minimum: 1
 *         chatId:
 *           type: number
 *           format: number
 *           minimum: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *      Chat:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          name:
 *            type: string
 *          members:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/ChatMember'
 *          createdAt:
 *             type: string
 *             format: date-time
 *          updatedAt:
 *             type: string
 *             format: date-time
 */
class ChatController extends BaseController {
  private chatService: ChatService;

  public constructor(logger: Logger, chatService: ChatService) {
    super(logger, APIPath.CHATS);

    this.chatService = chatService;

    this.addRoute({
      path: ChatsApiPath.ROOT,
      method: 'GET',
      handler: (options) => {
        return this.findAll(
          options as APIHandlerOptions<{ user: UserAuthResponseDto }>,
        );
      },
    });

    this.addRoute({
      path: ChatsApiPath.ROOT,
      method: 'POST',
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: ChatCreateRequestDto;
            user: UserAuthResponseDto;
          }>,
        );
      },
    });
  }

  /**
   * @swagger
   * /chats:
   *   get:
   *     description: Returns all chats with authenticated user
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 items:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Chat'
   */
  private async findAll(
    options: APIHandlerOptions<{ user: UserAuthResponseDto }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.chatService.findAllByUserId(options.user.id),
    };
  }

  /**
   * @swagger
   * /chats:
   *   post:
   *     description: Create a new chat
   *     responses:
   *       201:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Chat'
   */
  private async create(
    options: APIHandlerOptions<{
      body: ChatCreateRequestDto;
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const chatEntity = ChatEntity.initializeNew({
      name: MOCKED_CHAT_NAME,
    });

    return {
      status: HTTPCode.CREATED,
      payload: await this.chatService.create({
        members: [options.user.id],
        chatEntity,
      }),
    };
  }
}

export { ChatController };
