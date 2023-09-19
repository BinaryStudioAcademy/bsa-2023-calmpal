type MeditationEntryCreateForm = {
  name: string;
  file: {
    data: File;
    type: string;
    size: number;
  } | null;
};

export { type MeditationEntryCreateForm };
