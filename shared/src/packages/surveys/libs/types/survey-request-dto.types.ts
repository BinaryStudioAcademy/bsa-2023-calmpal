type SurveyRequestDto = {
  userId: number;
  preferences: string[];
  feelings: string[];
  goals: string[];
  worries: string[];
  journaling_experience: string[];
};

export { type SurveyRequestDto };
