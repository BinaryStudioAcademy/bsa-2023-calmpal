const AuthApiPath = {
  ROOT: '/',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  AUTHENTICATED_USER: '/authenticated-user',
  SIGN_UP_SURVEY: '/sign-up/survey',
  DELETE_USER: '/delete-user/:id',
} as const;

export { AuthApiPath };
