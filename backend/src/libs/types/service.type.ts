type Service<T = unknown> = {
  find(): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(): Promise<T>;
  delete(payload: unknown): Promise<boolean>;
};

export { type Service };
