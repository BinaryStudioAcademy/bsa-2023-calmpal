type MeditationCreateValidation = {
  title: string;
  file: {
    name: string;
    type: string;
    size: number;
  } | null;
};

export { type MeditationCreateValidation };
