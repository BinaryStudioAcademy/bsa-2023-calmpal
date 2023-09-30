import { ExceptionMessage } from '#libs/enums/enums.js';
import { UsersError } from '#libs/exceptions/exceptions.js';
import { HTTPCode } from '#libs/packages/http/http.js';
import { type Service } from '#libs/types/types.js';
import { userService } from '#packages/users/users.js';

import {
  type SurveyCreateRequestDto,
  type SurveyCreateResponseDto,
} from './libs/types/types.js';
import { SurveyEntity } from './survey.entity.js';
import { type SurveyRepository } from './survey.repository.js';

class SurveyService implements Service {
  private surveyRepository: SurveyRepository;

  public constructor(surveyRepository: SurveyRepository) {
    this.surveyRepository = surveyRepository;
  }

  public findById(): ReturnType<Service['findById']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<Service['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async create(
    payload: SurveyCreateRequestDto,
  ): Promise<SurveyCreateResponseDto | null> {
    const user = await userService.findById(payload.userId);

    if (!user) {
      throw new UsersError({
        status: HTTPCode.NOT_FOUND,
        message: ExceptionMessage.USER_NOT_FOUND,
      });
    }

    if (user.isSurveyCompleted) {
      const item = await this.surveyRepository.update(payload);

      return item?.toObject() ?? null;
    }

    const item = await this.surveyRepository.create(
      SurveyEntity.initializeNew({
        userId: payload.userId,
        preferences: payload.preferences,
        feelings: payload.feelings,
        goals: payload.goals,
        worries: payload.worries,
        meditationExperience: payload.meditationExperience,
        journalingExperience: payload.journalingExperience,
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
