const checkQuery = (query: string): boolean => {
  return /^[\sA-Za-z]*$/.test(query);
};
export { checkQuery };
