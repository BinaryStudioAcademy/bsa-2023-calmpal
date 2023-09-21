import { type Service } from '#libs/types/types.js';
import { type FileService } from '#packages/files/file.service.js';
import { type FileUploadRequestDto } from '#packages/files/files.js';

import { type MeditationEntryCreateResponseDto } from './libs/types/types.js';
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

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async create({
    name,
    file,
  }: {
    name: string;
    file: FileUploadRequestDto;
  }): Promise<MeditationEntryCreateResponseDto> {
    const { url, contentType } = await this.fileService.create(file);
    const item = await this.meditationRepository.create(
      MeditationEntity.initializeNew({
        name: name,
        mediaUrl: url,
        contentType,
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
