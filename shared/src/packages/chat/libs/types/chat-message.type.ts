type ChatMessage = {
  id: string;
  sender: string;
  message: { message: string; id: string }[];
};

export { type ChatMessage };
