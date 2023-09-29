const UsersTableColumn = {
  ID: 'id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
  EMAIL: 'email',
  ROLE_ID: 'role_id',
  PASSWORD_HASH: 'password_hash',
  PASSWORD_SALT: 'password_salt',
} as const;

export { UsersTableColumn };
