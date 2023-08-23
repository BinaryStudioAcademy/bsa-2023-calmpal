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

  public async findAll(): Promise<SurveyEntity[]> {
    const surveys: SurveyModel[] = await this.surveyModel.query().execute();

    return surveys.map((survey) => SurveyEntity.initialize(survey));
  }

  public async create(entity: SurveyEntity): Promise<SurveyEntity> {
    const { userId, preferences } = entity.toNewObject();

    const survey = await this.surveyModel
      .query()
      .insert({
        userId,
        preferences,
      })
      .returning('*')
      .execute();

    return SurveyEntity.initialize(survey);
  }

  public update(): ReturnType<Repository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { SurveyRepository };
