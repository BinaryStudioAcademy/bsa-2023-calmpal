const ExceptionMessage = {
  INVALID_TOKEN: 'Token is invalid.',
  UNAUTHORIZED_USER: 'User is not authorized.',
  USER_NOT_FOUND: 'User with these credentials was not found',
  INCORRECT_PASSWORD: 'Incorrect password',
} as const;

export { ExceptionMessage };
