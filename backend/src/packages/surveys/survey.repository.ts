import { type Repository } from '#libs/types/types.js';

import { SurveyEntity } from './survey.entity.js';
import { type SurveyModel } from './survey.model.js';
import { type SurveyCreateRequestDto } from './surveys.js';

class SurveyRepository implements Repository {
  private surveyModel: typeof SurveyModel;

  public constructor(surveyModel: typeof SurveyModel) {
    this.surveyModel = surveyModel;
  }

  public findById(): ReturnType<Repository['findById']> {
    return Promise.resolve(null);
  }

  public async findByUserId(userId: number): Promise<SurveyEntity | null> {
    const survey = await this.surveyModel
      .query()
      .where('userId', userId)
      .first();

    if (!survey) {
      return null;
    }

    return SurveyEntity.initialize({
      id: survey.id,
      userId: survey.userId,
      preferences: survey.preferences,
      feelings: survey.feelings,
      goals: survey.goals,
      worries: survey.worries,
      meditationExperience: survey.meditationExperience,
      journalingExperience: survey.journalingExperience,
      createdAt: new Date(survey.createdAt),
      updatedAt: new Date(survey.updatedAt),
    });
  }

  public findAll(): ReturnType<Repository['findAll']> {
    return Promise.resolve([]);
  }

  public async create(entity: SurveyEntity): Promise<SurveyEntity> {
    const {
      userId,
      preferences,
      feelings,
      goals,
      worries,
      meditationExperience,
      journalingExperience,
    } = entity.toNewObject();

    const survey = await this.surveyModel
      .query()
      .insertGraph({
        userId,
        preferences,
        feelings,
        goals,
        worries,
        meditationExperience,
        journalingExperience,
      })
      .execute();

    return SurveyEntity.initialize({
      id: survey.id,
      userId: survey.userId,
      preferences: survey.preferences,
      feelings: survey.feelings,
      goals: survey.goals,
      worries: survey.worries,
      meditationExperience: survey.meditationExperience,
      journalingExperience: survey.journalingExperience,
      createdAt: new Date(survey.createdAt),
      updatedAt: new Date(survey.updatedAt),
    });
  }

  public async update(
    payload: SurveyCreateRequestDto,
  ): Promise<SurveyEntity | null> {
    const survey = await this.findByUserId(payload.userId);

    if (survey) {
      const { id } = survey.toObject();

      const updatedSurvey = await this.surveyModel
        .query()
        .patchAndFetchById(id, {
          preferences: payload.preferences,
          feelings: payload.feelings,
          goals: payload.goals,
          worries: payload.worries,
          meditationExperience: payload.meditationExperience,
          journalingExperience: payload.journalingExperience,
        });

      return SurveyEntity.initialize({
        id: updatedSurvey.id,
        userId: updatedSurvey.userId,
        preferences: updatedSurvey.preferences,
        feelings: updatedSurvey.feelings,
        goals: updatedSurvey.goals,
        worries: updatedSurvey.worries,
        meditationExperience: updatedSurvey.meditationExperience,
        journalingExperience: updatedSurvey.journalingExperience,
        createdAt: new Date(updatedSurvey.createdAt),
        updatedAt: new Date(),
      });
    }

    return null;
  }

  public delete(): ReturnType<Repository['delete']> {
    const DELETED_COUNT = 0;

    return Promise.resolve(DELETED_COUNT);
  }
}

export { SurveyRepository };
