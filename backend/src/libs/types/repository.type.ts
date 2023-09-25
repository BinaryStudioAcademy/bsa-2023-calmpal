type Repository<T = unknown> = {
  find(id: number): Promise<T>;
  findAll(query: string): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(payload: unknown): Promise<number>;
};

export { type Repository };
