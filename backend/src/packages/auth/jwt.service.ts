import { SignJWT } from 'jose';

class JWTService {
  private secret: Buffer;

  public constructor(secret: string) {
    this.secret = Buffer.from(secret, 'utf8');
  }

  public async signJWT(payload: Record<string, number>): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .sign(this.secret);
  }
}

export { JWTService };
