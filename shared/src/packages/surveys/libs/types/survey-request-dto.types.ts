type SurveyRequestDto = {
  userId: number;
  preferences: string[];
  feelings: string[];
  goals: string[];
  worries: string[];
  meditation_experience: string[];
  journaling_experience: string[];
};

export { type SurveyRequestDto };
