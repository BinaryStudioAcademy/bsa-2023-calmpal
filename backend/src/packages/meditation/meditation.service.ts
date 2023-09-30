import { type Service } from '#libs/types/types.js';
import { type FileService } from '#packages/files/file.service.js';
import { type FileUploadRequestDto } from '#packages/files/files.js';

import {
  type MeditationEntryCreateResponseDto,
  type MeditationEntryGetAllResponseDto,
} from './libs/types/types.js';
import { MeditationEntity } from './meditation.entity.js';
import { type MeditationRepository } from './meditation.repository.js';

class MeditationService implements Service {
  private meditationRepository: MeditationRepository;

  private fileService: FileService;

  public constructor(
    meditationRepository: MeditationRepository,
    fileService: FileService,
  ) {
    this.meditationRepository = meditationRepository;
    this.fileService = fileService;
  }

  public findById(): ReturnType<Service['findById']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Service['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async findByUserId(
    userId: number,
  ): Promise<MeditationEntryGetAllResponseDto> {
    const items = await this.meditationRepository.findByUserId(userId);

    return {
      items: items.map((item) => {
        return item.toObject();
      }),
    };
  }

  public async create({
    name,
    file,
    userId,
  }: {
    name: string;
    file: FileUploadRequestDto;
    userId: number;
  }): Promise<MeditationEntryCreateResponseDto> {
    const { url, contentType } = await this.fileService.create(file);
    const item = await this.meditationRepository.create(
      MeditationEntity.initializeNew({
        name,
        mediaUrl: url,
        contentType,
        userId,
      }),
    );

    return item.toObject();
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { MeditationService };
