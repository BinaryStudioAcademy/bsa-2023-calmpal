import { type Service } from '#libs/types/types.js';

import {
  type MeditationEntryRequestDto,
  type MeditationEntryResponseDto,
} from './libs/types/types.js';
import { MeditationEntity } from './meditation.entity.js';
import { type MeditationRepository } from './meditation.repository.js';

class MeditationService implements Service {
  private meditationRepository: MeditationRepository;

  public constructor(meditationRepository: MeditationRepository) {
    this.meditationRepository = meditationRepository;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async create({
    topicName,
    mediaUrl,
    contentType,
  }: MeditationEntryRequestDto): Promise<MeditationEntryResponseDto> {
    const topic = await this.meditationRepository.findTopicByName(topicName);

    const item = await this.meditationRepository.create(
      MeditationEntity.initializeNew({ mediaUrl, contentType }),
      topic?.id,
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
