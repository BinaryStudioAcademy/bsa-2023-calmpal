import { type UserAuthResponseDto } from '#packages/users/users.js';

type Service<T = unknown> = {
  find(): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(): Promise<T>;
  delete(id: number, user: UserAuthResponseDto): Promise<boolean>;
};

export { type Service };
