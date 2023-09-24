import { type Repository } from '#libs/types/types.js';

import { MeditationEntriesRelation } from './libs/enums/enums.js';
import {
  type MeditationCommonQueryResponse,
  type MeditationCreateQueryPayload,
} from './libs/types/types.js';
import { MeditationEntity } from './meditation.entity.js';
import { type MeditationEntryModel } from './meditation-entry.model.js';

class MeditationRepository implements Repository {
  private meditationEntryModel: typeof MeditationEntryModel;

  public constructor(meditationEntryModel: typeof MeditationEntryModel) {
    this.meditationEntryModel = meditationEntryModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<MeditationEntity[]> {
    const meditationEntries = await this.meditationEntryModel
      .query()
      .select()
      .castTo<MeditationCommonQueryResponse[]>();

    return meditationEntries.map((meditationEntry) => {
      return MeditationEntity.initialize({
        id: meditationEntry.id,
        name: meditationEntry.name,
        mediaUrl: meditationEntry.mediaUrl,
        contentType: meditationEntry.contentType,
        createdAt: new Date(meditationEntry.createdAt),
        updatedAt: new Date(meditationEntry.updatedAt),
      });
    });
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
    const deletedId = 0;

    return Promise.resolve(deletedId);
  }
}

export { MeditationRepository };
