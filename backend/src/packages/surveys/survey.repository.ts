import { type Repository } from '#libs/types/types.js';

import { SurveyEntity } from './survey.entity.js';
import { type SurveyModel } from './survey.model.js';

class SurveyRepository implements Repository {
  private surveyModel: typeof SurveyModel;

  public constructor(surveyModel: typeof SurveyModel) {
    this.surveyModel = surveyModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): ReturnType<Repository['findAll']> {
    return await Promise.resolve([]);
  }

  public async create(entity: SurveyEntity): Promise<SurveyEntity> {
    const { userId, preferences } = entity.toNewObject();

    const survey = await this.surveyModel
      .query()
      .insertGraph({
        userId,
        preferences,
      })
      .execute();

    return SurveyEntity.initialize({
      id: survey.id,
      userId: survey.userId,
      preferences: survey.preferences,
      createdAt: new Date(survey.createdAt),
      updatedAt: new Date(survey.updatedAt),
    });
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { SurveyRepository };
