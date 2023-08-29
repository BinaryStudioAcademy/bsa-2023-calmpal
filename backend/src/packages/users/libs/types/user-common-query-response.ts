type UserCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  details?: {
    fullName: string;
    isSurveyCompleted: boolean;
  };
};

export { type UserCommonQueryResponse };
