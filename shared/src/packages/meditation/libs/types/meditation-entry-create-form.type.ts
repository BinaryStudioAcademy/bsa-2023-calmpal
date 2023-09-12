type MeditationEntryCreateForm = {
  title: string;
  file: {
    name: string;
    type: string;
    size: number;
  } | null;
};

export { type MeditationEntryCreateForm };
