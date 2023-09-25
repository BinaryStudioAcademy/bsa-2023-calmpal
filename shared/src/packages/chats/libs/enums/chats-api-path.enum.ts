const ChatsApiPath = {
  ROOT: '/',
  $ID_MESSAGES: '/:id/messages',
  $ID: '/:id',
  $ID_GENERATE_REPLIES: '/:id/generate-replies',
} as const;

export { ChatsApiPath };
