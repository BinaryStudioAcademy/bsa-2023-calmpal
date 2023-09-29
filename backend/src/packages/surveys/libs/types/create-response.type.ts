import { type SurveyEntity } from '#packages/surveys/survey.entity.js';

type SurveyCreateResponseDto = {
  id: number;
  userId: number;
  preferences: SurveyEntity['preferences'];
  feelings: SurveyEntity['feelings'];
  goals: SurveyEntity['goals'];
  worries: SurveyEntity['worries'];
  meditationExperience: SurveyEntity['meditationExperience'];
  journalingExperience: SurveyEntity['journalingExperience'];
  createdAt: Date;
  updatedAt: Date;
};

export { type SurveyCreateResponseDto };
