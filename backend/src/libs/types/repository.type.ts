type Repository<T = unknown> = {
  find(id: number): Promise<T>;
  findAll(query: string): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(): Promise<boolean>;
};

export { type Repository };
