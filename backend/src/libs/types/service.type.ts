type Service<T = unknown> = {
  find(id: number): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown, id?: number): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(): Promise<boolean>;
};

export { type Service };
