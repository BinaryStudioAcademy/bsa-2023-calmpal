import joi from 'joi';

type SurveyInputDto = {
  feelings: string[];
};

const createFeelingsSurveyForm = joi.object<SurveyInputDto, true>({
  feelings: joi.array().items(joi.string()),
});

export { createFeelingsSurveyForm };
