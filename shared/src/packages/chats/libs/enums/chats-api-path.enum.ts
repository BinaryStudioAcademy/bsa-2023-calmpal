const ChatsApiPath = {
  ROOT: '/',
  $ID_MESSAGES: '/:id/messages',
  $ID: '/:id',
  $ID_GENERATED_REPLIES: '/:id/generated-replies',
} as const;

export { ChatsApiPath };
