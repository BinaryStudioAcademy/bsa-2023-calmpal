type MeditationEntryCreateForm = {
  title: string;
  file: {
    type: string;
    size: number;
    data: File;
  } | null;
};

export { type MeditationEntryCreateForm };
