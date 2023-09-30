const DatabaseTableName = {
  MIGRATIONS: 'migrations',
  USERS: 'users',
  USER_DETAILS: 'user_details',
  CHATS: 'chats',
  CHAT_MESSAGES: 'chat_messages',
  USERS_TO_CHATS: 'users_to_chats',
  SURVEYS: 'surveys',
  MEDITATION_TOPICS: 'meditation_topics',
  MEDITATION_ENTRIES: 'meditation_entries',
  USER_ROLES: 'user_roles',
  FILES: 'files',
  JOURNAL_ENTRIES: 'journal_entries',
  SUBSCRIPTIONS: 'subscriptions',
} as const;
export { DatabaseTableName };
