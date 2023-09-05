type MeditationCreateQueryPayload = {
  id: number;
  audioUrl: string;
  topic: {
    id?: number;
    name: string;
  };
};

export { type MeditationCreateQueryPayload };
