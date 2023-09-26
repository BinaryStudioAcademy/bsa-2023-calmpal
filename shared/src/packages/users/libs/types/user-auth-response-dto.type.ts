type UserAuthResponseDto = {
  id: number;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  isSurveyCompleted: boolean;
  subscriptionId: number | null;
  subscriptionEndDate: Date | null;
};

export { type UserAuthResponseDto };
