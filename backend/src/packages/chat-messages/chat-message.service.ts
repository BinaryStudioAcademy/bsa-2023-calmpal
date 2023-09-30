import { ExceptionMessage } from '#libs/enums/enums.js';
import { UsersError } from '#libs/exceptions/exceptions.js';
import {
  groupChatMessage,
  replaceTemplateWithValue,
} from '#libs/helpers/helpers.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { OpenAiRoleKey } from '#libs/packages/open-ai/libs/enums/open-ai-role-key.enum.js';
import { type OpenAiMessageGenerateRequestDto } from '#libs/packages/open-ai/libs/types/types.js';
import { type Service } from '#libs/types/types.js';
import { type ChatbotService } from '#packages/chats/chats.js';
import { userService } from '#packages/users/users.js';

import { ChatMessageEntity } from './chat-message.entity.js';
import { type ChatMessageRepository } from './chat-message.repository.js';
import { PROMPT_TEMPLATE } from './libs/constants/constants.js';
import {
  type ChatMessageCreatePayload,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
  type ChatMessagesGroups,
} from './libs/types/types.js';

type Constructor = {
  chatMessageRepository: ChatMessageRepository;
  chatbotService: ChatbotService;
};

class ChatMessageService implements Service {
  private chatMessageRepository: ChatMessageRepository;

  private chatbotService: ChatbotService;

  public constructor({ chatMessageRepository, chatbotService }: Constructor) {
    this.chatMessageRepository = chatMessageRepository;
    this.chatbotService = chatbotService;
  }

  public findById(): ReturnType<Service['findById']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Service['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async create(
    payload: ChatMessageCreatePayload,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const sender = await userService.findById(payload.senderId);
    if (!sender) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const chatMessage = await this.chatMessageRepository.create(
      ChatMessageEntity.initializeNew({
        message: payload.message,
        chatId: payload.chatId,
        senderId: payload.senderId,
      }),
    );

    return chatMessage.toObject();
  }

  public async generateReply(
    payload: ChatMessageCreatePayload,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const sender = await this.chatbotService.getChatbotUser();
    if (!sender) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    const chatMessages = await this.chatMessageRepository.findAllByChatId(
      payload.chatId,
    );

    const openAiMessages: OpenAiMessageGenerateRequestDto[] = chatMessages.map(
      (chatMessage) => {
        const { senderId, message } = chatMessage.toObject();

        return {
          role:
            payload.senderId === senderId
              ? OpenAiRoleKey.ASSISTANT
              : OpenAiRoleKey.USER,
          content: message,
        };
      },
    );

    const content = replaceTemplateWithValue({
      template: PROMPT_TEMPLATE,
      replacements: { message: payload.message },
    });

    openAiMessages.push({
      role: 'user',
      content,
    });

    const generatedReply = await this.chatbotService.generateReply(
      openAiMessages,
    );

    const chatMessage = await this.chatMessageRepository.create(
      ChatMessageEntity.initializeNew({
        message: generatedReply,
        chatId: payload.chatId,
        senderId: sender.id,
      }),
    );

    return chatMessage.toObject();
  }

  public async findAllByChatId(
    chatId: number,
  ): Promise<ChatMessageGetAllResponseDto> {
    const chatMessages = await this.chatMessageRepository.findAllByChatId(
      chatId,
    );

    const groups: ChatMessagesGroups = chatMessages.reduce(
      (group, chatMessage) => {
        const chatData = chatMessage.toObject();

        return groupChatMessage(group, chatData);
      },
      {},
    );

    return {
      items: groups,
    };
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { ChatMessageService };
