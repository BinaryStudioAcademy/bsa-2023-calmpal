import joi from 'joi';

type SurveyInputDto = {
  journalingExperience: string[];
};

const createJournalingExperienceSurveyForm = joi.object<SurveyInputDto, true>({
  journalingExperience: joi.array().items(joi.string()),
});

export { createJournalingExperienceSurveyForm };
