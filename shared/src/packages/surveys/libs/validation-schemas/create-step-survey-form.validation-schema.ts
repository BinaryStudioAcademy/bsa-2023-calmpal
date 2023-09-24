import joi from 'joi';

type SurveyInputDto = {
  feelings: string[];
};

const createStepSurveyForm = joi.object<SurveyInputDto, true>({
  feelings: joi.array().items(joi.string()),
});

export { createStepSurveyForm };
