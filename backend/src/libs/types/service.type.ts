type Service<T = unknown> = {
  find(id: number): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(id?: number): Promise<boolean>;
};

export { type Service };
