import { type Service } from '#libs/types/types.js';
import { userService } from '#packages/users/users.js';

import {
  type SurveyGetAllItemResponseDto,
  type SurveyRequestDto,
} from './libs/types/types.js';
import { SurveyEntity } from './survey.entity.js';
import { type SurveyRepository } from './survey.repository.js';

class SurveyService implements Service {
  private surveyRepository: SurveyRepository;

  public constructor(surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): ReturnType<Service['findAll']> {
    return await Promise.resolve({ items: [] });
  }

  public async create(
    payload: SurveyRequestDto,
  ): Promise<SurveyGetAllItemResponseDto> {
    const item = await this.surveyRepository.create(
      SurveyEntity.initializeNew({
        userId: payload.userId,
        preferences: payload.preferences,
      }),
    );

    await userService.completeSurvey(payload.userId);

    return item.toObject();
  }

  public update(): ReturnType<Service['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<Service['delete']> {
    return Promise.resolve(true);
  }
}

export { SurveyService };
