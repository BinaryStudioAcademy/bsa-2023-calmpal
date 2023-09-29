import { APIPath, ExceptionMessage } from '#libs/enums/enums.js';
import { ChatError } from '#libs/exceptions/exceptions.js';
import {
  type APIHandlerOptions,
  type APIHandlerResponse,
  BaseController,
} from '#libs/packages/controller/controller.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Logger } from '#libs/packages/logger/logger.js';
import {
  type ChatMessageCreatePayload,
  type ChatMessageCreateRequestDto,
} from '#packages/chat-messages/chat-messages.js';
import { type UserAuthResponseDto } from '#packages/users/users.js';

import { ChatEntity } from './chat.entity.js';
import { type ChatService } from './chat.service.js';
import { ChatsApiPath } from './libs/enums/enums.js';
import {
  type ChatCreateRequestDto,
  type EntitiesFilteringDto,
  type UpdateChatDataRequestDto,
} from './libs/types/types.js';
import {
  createChatValidationSchema,
  entitiesFilteringQueryValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';

type Constructor = {
  logger: Logger;
  chatService: ChatService;
};

/**
 * @swagger
 *  components:
 *  schemas:
 *    ChatMember:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          format: number
 *          minimum: 1
 *        userId:
 *          type: number
 *          format: number
 *          minimum: 1
 *        chatId:
 *          type: number
 *          format: number
 *          minimum: 1
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *    Chat:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          format: number
 *          minimum: 1
 *        name:
 *          type: string
 *        members:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/ChatMember'
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *        imageUrl:
 *          type: string
 *    ChatMessage:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          format: number
 *          minimum: 1
 *        message:
 *          type: string
 *        senderId:
 *          type: number
 *          minimum: 1
 *        chatId:
 *          type: number
 *          minimum: 1
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 *    Error:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *        errorType:
 *          type: string
 */
class ChatController extends BaseController {
  private chatService: ChatService;

  public constructor({ logger, chatService }: Constructor) {
    super(logger, APIPath.CHATS);
    this.chatService = chatService;

    this.addRoute({
      path: ChatsApiPath.ROOT,
      method: 'GET',
      validation: {
        query: entitiesFilteringQueryValidationSchema,
      },
      handler: (options) => {
        return this.findAll(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
            query: EntitiesFilteringDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: ChatsApiPath.ROOT,
      method: 'POST',
      validation: {
        body: createChatValidationSchema,
      },
      handler: (options) => {
        return this.create(
          options as APIHandlerOptions<{
            body: ChatCreateRequestDto;
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: ChatsApiPath.$ID_MESSAGES,
      method: 'POST',
      handler: (options) => {
        return this.createMessage(
          options as APIHandlerOptions<{
            body: ChatMessageCreateRequestDto;
            params: { id: string };
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: ChatsApiPath.$ID_GENERATE_REPLY,
      method: 'POST',
      handler: (options) => {
        return this.generateReply(
          options as APIHandlerOptions<{
            body: ChatMessageCreateRequestDto;
            params: { id: string };
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: ChatsApiPath.$ID,
      method: 'PUT',
      handler: (options) => {
        return this.update(
          options as APIHandlerOptions<{
            body: UpdateChatDataRequestDto;
            params: { id: number };
            user: UserAuthResponseDto;
          }>,
        );
      },
    });

    this.addRoute({
      path: ChatsApiPath.$ID_MESSAGES,
      method: 'GET',
      handler: (options) => {
        return this.findAllMessagesByChatId(
          options as APIHandlerOptions<{
            params: { id: string };
          }>,
        );
      },
    });

    this.addRoute({
      path: ChatsApiPath.$ID,
      method: 'DELETE',
      handler: (options) => {
        return this.delete(
          options as APIHandlerOptions<{
            user: UserAuthResponseDto;
            params: { id: string };
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
   *     parameters:
   *       - name: query
   *         in: query
   *         description: A string to search chats
   *         required: false
   *         schema:
   *           type: string
   *     security:
   *      - bearerAuth: []
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
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: integer
   *                   example: 400
   *                 message:
   *                   type: string
   *                   example: The data which was passed is incorrect.
   */
  private async findAll(
    options: APIHandlerOptions<{
      user: UserAuthResponseDto;
      query: EntitiesFilteringDto;
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.chatService.findAllByUserId(
        options.user.id,
        options.query.query,
      ),
    };
  }

  /**
   * @swagger
   * /chats:
   *   post:
   *     description: Create a new chat
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       description: Create chat data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
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
      name: 'Chat',
      imageUrl: null,
    });

    return {
      status: HTTPCode.CREATED,
      payload: await this.chatService.create({
        chatEntity,
        userId: options.user.id,
        message: options.body.message,
      }),
    };
  }

  /**
   * @swagger
   * /chats/{id}/messages:
   *   post:
   *     description: Create a new chat message
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       -  in: path
   *          description: Chat id
   *          name: id
   *          required: true
   *          type: number
   *          minimum: 1
   *     requestBody:
   *       description: Create message data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   *     responses:
   *       201:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ChatMessage'
   */
  private async createMessage(
    options: APIHandlerOptions<{
      body: ChatMessageCreateRequestDto;
      params: { id: string };
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const chatMessageToCreateData: ChatMessageCreatePayload = {
      chatId: Number(options.params.id),
      message: options.body.message,
      senderId: options.user.id,
    };

    return {
      status: HTTPCode.CREATED,
      payload: await this.chatService.createMessage(chatMessageToCreateData),
    };
  }

  /**
   * @swagger
   * /chats/{id}/generated-replies:
   *   post:
   *     description: Generate reply for a message
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       -  in: path
   *          description: Chat id
   *          name: id
   *          required: true
   *          type: number
   *          minimum: 1
   *     requestBody:
   *       description: Create message data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               message:
   *                 type: string
   *     responses:
   *       201:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ChatMessage'
   */
  private async generateReply(
    options: APIHandlerOptions<{
      body: ChatMessageCreateRequestDto;
      params: { id: string };
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const generateReplyToCreateData: ChatMessageCreatePayload = {
      chatId: Number(options.params.id),
      message: options.body.message,
      senderId: options.user.id,
    };

    return {
      status: HTTPCode.CREATED,
      payload: await this.chatService.generateReply(generateReplyToCreateData),
    };
  }

  /**
   * @swagger
   * /chats/{id}/messages:
   *   get:
   *     description: Returns all chat messages
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       -  in: path
   *          description: Chat id
   *          name: id
   *          required: true
   *          type: number
   *          minimum: 1
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
   *                     $ref: '#/components/schemas/ChatMessage'
   */
  private async findAllMessagesByChatId(
    options: APIHandlerOptions<{
      params: { id: string };
    }>,
  ): Promise<APIHandlerResponse> {
    return {
      status: HTTPCode.OK,
      payload: await this.chatService.findAllMessagesByChatId(
        Number(options.params.id),
      ),
    };
  }

  /**
   * @swagger
   * /chats/{id}:
   *   delete:
   *     description: Delete chat by id
   *     security:
   *      - bearerAuth: []
   *     parameters:
   *      -  in: path
   *         description: Chat id
   *         name: id
   *         required: true
   *         type: number
   *         minimum: 1
   *     responses:
   *       200:
   *         description: Successful operation
   *         content:
   *           application/json:
   *             schema:
   *               type: boolean
   *       404:
   *         description: Chat was not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *             example:
   *               message: "Chat with such id was not found."
   *               errorType: "COMMON"
   */
  private async delete(
    options: APIHandlerOptions<{
      params: { id: string };
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const { id } = options.params;
    const { id: userId } = options.user;

    if (!Number(id)) {
      throw new ChatError({
        status: HTTPCode.BAD_REQUEST,
        message: ExceptionMessage.CHAT_NOT_FOUND,
      });
    }

    const isDeleted = await this.chatService.delete({ id: Number(id), userId });

    if (!isDeleted) {
      throw new ChatError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.CHAT_NOT_FOUND,
      });
    }

    return {
      status: HTTPCode.OK,
      payload: isDeleted,
    };
  }

  /**
   * @swagger
   * /chats/{id}:
   *   put:
   *     description: Update a chat
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         description: Chat id
   *         name: id
   *         required: true
   *         type: number
   *         minimum: 1
   *     requestBody:
   *       description: Chat data
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Chat'
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
  private async update(
    options: APIHandlerOptions<{
      body: UpdateChatDataRequestDto;
      params: { id: number };
      user: UserAuthResponseDto;
    }>,
  ): Promise<APIHandlerResponse> {
    const chat = await this.chatService.findById({
      id: options.params.id,
      userId: options.user.id,
    });

    const name = await this.chatService.generateChatName(options.body.message);
    const url = await this.chatService.generateChatImage(name);

    return {
      status: HTTPCode.OK,
      payload: await this.chatService.update({
        chat,
        url,
        name,
      }),
    };
  }
}

export { ChatController };
