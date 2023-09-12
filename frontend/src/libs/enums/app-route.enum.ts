const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  MEDITATION: '/meditation',
  SIGN_UP_SURVEY: '/sign-up/survey',
  CHATS: '/chats',
  JOURNAL: '/journal',
  JOURNAL_ENTRY_$ID: '/journal/:id',
  PROFILE: '/profile',
} as const;

export { AppRoute };
