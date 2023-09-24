import joi from 'joi';

type SurveyInputDto = {
  journalingExperience: string;
};

const createOneAnswerStepSurveyForm = joi.object<SurveyInputDto, true>({
  journalingExperience: joi.string(),
});

export { createOneAnswerStepSurveyForm };
