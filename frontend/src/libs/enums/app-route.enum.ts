const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  MEDITATION: '/meditation',
  MEDITATION_SESSION: ':id',
  SIGN_UP_SURVEY: '/sign-up/survey',
  CHATS: '/chats',
  JOURNAL: '/journal',
  PROFILE: '/profile',
} as const;

export { AppRoute };
