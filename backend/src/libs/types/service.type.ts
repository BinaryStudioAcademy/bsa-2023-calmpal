type Service<T = unknown> = {
  find(): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(): Promise<T>;
  delete(id: number): Promise<T>;
};

export { type Service };
