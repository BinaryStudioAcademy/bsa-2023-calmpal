type JournalEntryUpdateRequestDto = {
  id: string;
  body: {
    userId: number;
    title: string;
    text: string;
  };
};

export { type JournalEntryUpdateRequestDto };
