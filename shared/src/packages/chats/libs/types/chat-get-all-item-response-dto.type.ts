type ChatGetAllItemResponseDto = {
  id: number;
  name: string;
  members: {
    id: number;
    userId: number;
    chatId: number;
  }[];
};

export { type ChatGetAllItemResponseDto };
