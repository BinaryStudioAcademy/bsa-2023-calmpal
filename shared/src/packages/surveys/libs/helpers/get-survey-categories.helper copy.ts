type SurveyInputDto = {
  journalingExperience: string[];
};

const getSurveyCategories: (payload: SurveyInputDto) => string[] = (
  payload,
) => {
  return [...new Set(payload.journalingExperience)];
};

export { getSurveyCategories };
