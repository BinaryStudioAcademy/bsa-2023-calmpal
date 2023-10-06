import { ContentType, ExceptionMessage } from '#libs/enums/enums.js';
import { ChatError } from '#libs/exceptions/exceptions.js';
import { replaceTemplateWithValue } from '#libs/helpers/helpers.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { OpenAiRoleKey } from '#libs/packages/open-ai/libs/enums/enums.js';
import { type OpenAi } from '#libs/packages/open-ai/open-ai.js';
import { type Service } from '#libs/types/types.js';
import {
  type ChatMessageCreatePayload,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
  type ChatMessageService,
} from '#packages/chat-messages/chat-messages.js';
import { type FileService } from '#packages/files/files.js';

import { type ChatRepository } from './chat.repository.js';
import {
  CHAT_IMAGE_TEMPLATE,
  CHAT_NAME_TEMPLATE,
} from './libs/constants/constants.js';
import {
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
  type CreateChatPayload,
  type UpdateChatDataPayload,
} from './libs/types/types.js';

type Constructor = {
  chatRepository: ChatRepository;
  chatMessageService: ChatMessageService;
  openAiService: OpenAi;
  fileService: FileService;
};

class ChatService implements Service {
  private chatRepository: ChatRepository;
  private openAiService: OpenAi;
  private chatMessageService: ChatMessageService;
  private fileService: FileService;

  public constructor({
    chatRepository,
    chatMessageService,
    openAiService,
    fileService,
  }: Constructor) {
    this.chatRepository = chatRepository;
    this.chatMessageService = chatMessageService;
    this.openAiService = openAiService;
    this.fileService = fileService;
  }

  public findById(): ReturnType<Service['findById']> {
    return Promise.resolve(null);
  }

  public async findByIdAndUserId({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<ChatGetAllItemResponseDto> {
    const item = await this.chatRepository.findByIdAndUserId(id, userId);

    return item.toObject();
  }

  public findAll(): ReturnType<Service['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async findAllByUserId(
    userId: number,
    query: string,
  ): Promise<ChatGetAllResponseDto> {
    const items = await this.chatRepository.findAllByUserId(userId, query);

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public findAllMessagesByChatId(
    chatId: number,
  ): Promise<ChatMessageGetAllResponseDto> {
    return this.chatMessageService.findAllByChatId(chatId);
  }

  public async create({
    chatEntity,
    message,
    userId,
  }: CreateChatPayload): Promise<ChatGetAllItemResponseDto> {
    const createdChat = await this.chatRepository.create({
      chatEntity,
      members: [userId],
    });
    const chat = createdChat.toObject();

    await this.chatMessageService.create({
      message,
      chatId: chat.id,
      senderId: userId,
    });

    return chat;
  }

  public createMessage(
    payload: ChatMessageCreatePayload,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    return this.chatMessageService.create(payload);
  }

  public generateReply(
    payload: ChatMessageCreatePayload,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    return this.chatMessageService.generateReply(payload);
  }

  public async update({
    chat,
    url,
    name,
  }: UpdateChatDataPayload): Promise<ChatGetAllItemResponseDto> {
    const fileRecord = await this.fileService.create({
      buffer: Buffer.from(url, 'base64'),
      fileName: `chat-${chat.id}.png`,
      contentType: ContentType.PNG,
    });

    const item = await this.chatRepository.update({
      chat,
      imageUrl: fileRecord.url,
      name,
    });

    return item.toObject();
  }

  public async generateChatName(message: string): Promise<string> {
    return (await this.openAiService.getMessageResponse([
      {
        role: OpenAiRoleKey.USER,
        content: replaceTemplateWithValue({
          template: CHAT_NAME_TEMPLATE,
          replacements: { message },
        }),
      },
    ])) as string;
  }

  public async generateChatImage(name: string): Promise<string> {
    return (await this.openAiService.generateImages({
      prompt: replaceTemplateWithValue({
        template: CHAT_IMAGE_TEMPLATE,
        replacements: { name },
      }),
    })) as string;
  }

  public async delete({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<boolean> {
    if (!id) {
      throw new ChatError({
        status: HTTPCode.BAD_REQUEST,
        message: ExceptionMessage.CHAT_NOT_FOUND,
      });
    }

    const deletedCount = await this.chatRepository.delete({ id, userId });

    if (!deletedCount) {
      throw new ChatError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.CHAT_NOT_FOUND,
      });
    }

    return Boolean(deletedCount);
  }
}

export { ChatService };
