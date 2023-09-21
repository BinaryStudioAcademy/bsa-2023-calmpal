import joi from 'joi';

type SurveyInputDto = {
  meditationExperience: string[];
};

const createMeditationExperienceSurveyForm = joi.object<SurveyInputDto, true>({
  meditationExperience: joi.array().items(joi.string()),
});

export { createMeditationExperienceSurveyForm };
