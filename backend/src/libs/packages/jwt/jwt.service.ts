import { jwtVerify, SignJWT } from 'jose';

type Constructor = {
  secret: string;
  alg: string;
};

class JWTService {
  private secret: Buffer;

  private alg: string;

  public constructor({ secret, alg }: Constructor) {
    this.secret = Buffer.from(secret, 'utf8');
    this.alg = alg;
  }

  public signJWT(payload: Record<string, number>): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: this.alg })
      .sign(this.secret);
  }

  public async decode<TokenPayload>(token: string): Promise<TokenPayload> {
    const { payload } = await jwtVerify(token, this.secret);

    return payload as TokenPayload;
  }
}

export { JWTService };
