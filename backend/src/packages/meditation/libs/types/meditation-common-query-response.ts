type MeditationCommonQueryResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  audioUrl: string;
  topic: {
    name: string;
  };
};

export { type MeditationCommonQueryResponse };
