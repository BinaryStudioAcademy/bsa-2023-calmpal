import { type Repository } from '#libs/types/types.js';

import { MeditationRelation } from './libs/enums/enums.js';
import {
  type MeditationCommonQueryResponse,
  type MeditationCreateQueryPayload,
  type TopicCommonQueryResponse,
} from './libs/types/types.js';
import { MeditationEntity } from './meditation.entity.js';
import { type MeditationEntriesModel } from './meditation-entries.model.js';
import { type MeditationTopicModel } from './meditation-topics.model.js';

class MeditationRepository implements Repository {
  private meditationEntryModel: typeof MeditationEntriesModel;
  private meditationTopicModel: typeof MeditationTopicModel;

  public constructor(
    meditationEntryModel: typeof MeditationEntriesModel,
    meditationTopicModel: typeof MeditationTopicModel,
  ) {
    this.meditationEntryModel = meditationEntryModel;
    this.meditationTopicModel = meditationTopicModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findTopicByName(
    name: string,
  ): Promise<TopicCommonQueryResponse | undefined> {
    return await this.meditationTopicModel
      .query()
      .findOne({
        name,
      })
      .castTo<TopicCommonQueryResponse | undefined>()
      .execute();
  }

  public async findAll(): ReturnType<Repository['findAll']> {
    return await Promise.resolve([]);
  }

  public async create(
    entity: MeditationEntity,
    topicId?: number,
  ): Promise<MeditationEntity> {
    const { topicName: name, mediaUrl, contentType } = entity.toObject();
    const topic = topicId ? { name, id: topicId } : { name };

    const meditation = await this.meditationEntryModel
      .query()
      .insertGraph(
        {
          mediaUrl,
          contentType,
          [MeditationRelation.TOPIC]: topic,
        } as MeditationCreateQueryPayload,
        { relate: true },
      )
      .withGraphJoined(MeditationRelation.TOPIC)
      .castTo<MeditationCommonQueryResponse>();

    return MeditationEntity.initialize({
      id: meditation.id,
      topicName: meditation.topic.name,
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
