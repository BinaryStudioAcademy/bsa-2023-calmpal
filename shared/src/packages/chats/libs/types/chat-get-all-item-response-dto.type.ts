type ChatGetAllItemResponseDto = {
  id: number;
  name: string;
  imageUrl: string | null;
  members: {
    id: number;
    userId: number;
    chatId: number;
  }[];
};

export { type ChatGetAllItemResponseDto };
