const ChatsApiPath = {
  ROOT: '/',
  $ID_MESSAGES: '/:id/messages',
  $ID: '/:id',
  $ID_GENERATE_REPLY: '/:id/generate-reply',
} as const;

export { ChatsApiPath };
