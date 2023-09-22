type Repository<T = unknown> = {
  find(id: number): Promise<T>;
  findAll(): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(id: number): Promise<T>;
};

export { type Repository };
