const generateUUID = (): string => {
  return crypto.randomUUID();
};

export { generateUUID };
