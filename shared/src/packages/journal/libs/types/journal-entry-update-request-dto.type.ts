type JournalEntryUpdateRequestDto = {
  id: number;
  userId?: number;
  body: {
    title: string;
    text: string;
  };
};

export { type JournalEntryUpdateRequestDto };
