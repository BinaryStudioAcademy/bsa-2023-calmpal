import { type Service } from '#libs/types/types.js';

import { type SurveyGetAllResponseDto } from './libs/types/types.js';
import { SurveyEntity } from './survey.entity.js';
import { type SurveyRepository } from './survey.repository.js';
import {
  type SurveyGetAllItemResponseDto,
  type SurveyRequestDto,
} from './surveys.js';

class SurveyService implements Service {
  private surveyRepository: SurveyRepository;

  public constructor(surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository;
  }

  public find(): ReturnType<Service['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<SurveyGetAllResponseDto> {
    const items = await this.surveyRepository.findAll();

    return {
      items: items.map((item) => item.toObject()),
    };
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

    // await userService.updateIsSurveyCompleted(payload.userId);

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
