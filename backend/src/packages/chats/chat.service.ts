import { ExceptionMessage } from '#libs/enums/enums.js';
import { ChatError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type OpenAi } from '#libs/packages/open-ai/open-ai.js';
import { type S3 } from '#libs/packages/s3/s3.js';
import { type Service } from '#libs/types/types.js';
import {
  type ChatMessageCreatePayload,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
  type ChatMessageService,
} from '#packages/chat-messages/chat-messages.js';
import {
  type FileService,
  type FileUploadRequestDto,
} from '#packages/files/files.js';

import { type ChatRepository } from './chat.repository.js';
import {
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
  type CreateChatPayload,
  type UpdateChatImagePayload,
} from './libs/types/types.js';

type Constructor = {
  chatRepository: ChatRepository;
  chatMessageService: ChatMessageService;
  s3Service: S3;
  openAiService: OpenAi;
  httpService: HTTPService;
  fileService: FileService;
};

class ChatService implements Service {
  private chatRepository: ChatRepository;
  private s3Service: S3;
  private openAiService: OpenAi;
  private chatMessageService: ChatMessageService;
  private httpService: HTTPService;
  private fileService: FileService;

  public constructor({
    chatRepository,
    chatMessageService,
    s3Service,
    openAiService,
    httpService,
    fileService,
  }: Constructor) {
    this.chatRepository = chatRepository;
    this.chatMessageService = chatMessageService;
    this.s3Service = s3Service;
    this.openAiService = openAiService;
    this.httpService = httpService;
    this.fileService = fileService;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findById({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<ChatGetAllItemResponseDto> {
    const item = await this.chatRepository.findById(id, userId);

    return item.toObject();
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async findAllByUserId(
    userId: number,
    query: string,
  ): Promise<ChatGetAllResponseDto> {
    const items = await this.chatRepository.findAllByUserId(userId, query);

    const itemPromises = items.map(async (item) => {
      const imageUrl = await this.s3Service.getPreSignedUrl(
        this.s3Service.getFileKey(item.toObject().imageUrl) as string,
      );

      return {
        ...item.toObject(),
        imageUrl,
      };
    });

    return {
      items: await Promise.all(itemPromises),
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

    await this.chatMessageService.generateReply({
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

  public async updateImage({
    chat,
    imageUrl,
  }: UpdateChatImagePayload): Promise<ChatGetAllItemResponseDto> {
    const payload = await this.httpService.load<FileUploadRequestDto>({
      method: 'GET',
      url: imageUrl,
      isBuffer: true,
    });

    const fileRecord = await this.fileService.create(payload);

    const item = await this.chatRepository.update({
      chat,
      imageUrl: fileRecord.url,
    });
    const presignedImageUrl = await this.s3Service.getPreSignedUrl(
      this.s3Service.getFileKey(imageUrl) as string,
    );

    return { ...item.toObject(), imageUrl: presignedImageUrl };
  }

  public async generateChatName(message: string): Promise<string> {
    return (await this.openAiService.getMessageResponse([
      {
        role: 'user',
        content: `Could you please give me a two-three word name for a chat that starts with this opening message '${message}' and exclude the word 'Chat' from it.`,
      },
    ])) as string;
  }

  public async generateChatImage(name: string): Promise<string> {
    return (await this.openAiService.generateImages({
      prompt: `Could you please generate me a very abstract not detailed image in pastel colors, colors of which can resonate with the following title: '${name}'`,
    })) as string;
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public async delete({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<boolean> {
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
