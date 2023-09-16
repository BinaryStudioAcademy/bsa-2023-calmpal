type UserCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  details?: {
    fullName: string;
    isSurveyCompleted: boolean;
  };
};

export { type UserCommonQueryResponse };
