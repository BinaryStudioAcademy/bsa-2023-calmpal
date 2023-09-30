type Service<T = unknown> = {
  findById(id: number): Promise<T>;
  findAll(query: string): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(payload: unknown): Promise<boolean>;
};

export { type Service };
