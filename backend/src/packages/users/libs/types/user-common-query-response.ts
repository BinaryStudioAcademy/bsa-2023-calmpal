type UserCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  details?: {
    fullName: string;
    isSurveyCompleted: boolean;
    subscriptionId: number | null;
    subscription?: {
      endDate: string | null;
    };
  };
};

export { type UserCommonQueryResponse };
