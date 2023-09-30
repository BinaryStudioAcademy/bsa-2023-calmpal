import { ServerErrorType } from '#libs/enums/enums.js';

type Constructor = {
  message: string;
};

class AuthError extends Error {
  public name: string;

  public constructor({ message }: Constructor) {
    super(message);

    this.name = ServerErrorType.AUTHORIZATION;
  }
}

export { AuthError };
