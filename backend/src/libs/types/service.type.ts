type Service<T = unknown> = {
  find(): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(id: number, payload: unknown): Promise<T>;
  delete(): Promise<boolean>;
};

export { type Service };
