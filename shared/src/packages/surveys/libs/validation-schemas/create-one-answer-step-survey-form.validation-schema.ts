import joi from 'joi';

type SurveyInputDto = {
  journalingExperience: string;
  meditationExperience: string;
};

const createOneAnswerStepSurveyForm = joi.object<SurveyInputDto, true>({
  journalingExperience: joi.string().optional(),
  meditationExperience: joi.string().optional(),
});

export { createOneAnswerStepSurveyForm };
