type JournalEntryUpdateRequestDto = {
  id: string;
  body: {
    title: string;
    text: string;
  };
};

export { type JournalEntryUpdateRequestDto };
