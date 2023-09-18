import { type Repository } from '#libs/types/types.js';

import { MeditationEntriesRelation } from './libs/enums/enums.js';
import {
  type MeditationCommonQueryResponse,
  type MeditationCreateQueryPayload,
} from './libs/types/types.js';
import { MeditationEntity } from './meditation.entity.js';
import { type MeditationEntriesModel } from './meditation-entries.model.js';

class MeditationRepository implements Repository {
  private meditationEntryModel: typeof MeditationEntriesModel;

  public constructor(meditationEntryModel: typeof MeditationEntriesModel) {
    this.meditationEntryModel = meditationEntryModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): ReturnType<Repository['findAll']> {
    return await Promise.resolve([]);
  }

  public async create(entity: MeditationEntity): Promise<MeditationEntity> {
    const { name, mediaUrl, contentType } = entity.toObject();

    const meditation = await this.meditationEntryModel
      .query()
      .insertGraph({
        name,
        mediaUrl,
        contentType,
        topicId: null,
      } as MeditationCreateQueryPayload)
      .withGraphJoined(MeditationEntriesRelation.TOPIC)
      .castTo<MeditationCommonQueryResponse>();

    return MeditationEntity.initialize({
      id: meditation.id,
      name: meditation.name,
      mediaUrl: meditation.mediaUrl,
      contentType: meditation.contentType,
      createdAt: new Date(meditation.createdAt),
      updatedAt: new Date(meditation.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { MeditationRepository };
