type Repository<T = unknown> = {
  findById(id: number): Promise<T>;
  findAll(payload?: unknown): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(payload: unknown): Promise<number>;
};

export { type Repository };
