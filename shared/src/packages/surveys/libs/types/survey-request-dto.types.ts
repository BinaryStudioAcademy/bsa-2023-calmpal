type SurveyRequestDto = {
  userId: number;
  preferences: string[];
  feelings: string[];
  goals: string[];
  worries: string[];
  meditationExperience: string;
  journalingExperience: string;
};

export { type SurveyRequestDto };
