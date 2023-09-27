const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  MEDITATION: '/meditation',
  MEDITATION_$ID: '/meditation/:id',
  SIGN_UP_SURVEY: '/sign-up/survey',
  CHATS: '/chats',
  CHATS_$ID: '/chats/:id',
  JOURNAL: '/journal',
  JOURNAL_$ID: '/journal/:id',
  JOURNAL_$ID_QUERY: '/journal/:id?query=:query',
  CHATS_$ID_QUERY: '/chats/:id?query=:query',
  PROFILE: '/profile',
  PROFILE_SUBSCRIPTION: '/profile/subscription',
  PROFILE_SUBSCRIPTION_CHECKOUT: '/profile/subscription/checkout',
} as const;

export { AppRoute };
