type SurveyCreateResponseDto = {
  id: number;
  userId: number;
  preferences: string[];
  feelings: string[] | null;
  goals: string[] | null;
  worries: string[] | null;
  meditationExperience: string | null;
  journalingExperience: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export { type SurveyCreateResponseDto };
