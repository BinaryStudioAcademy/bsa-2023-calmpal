const getDOMParsedValueFromString = (value: string): Document => {
  const parser = new DOMParser();

  return parser.parseFromString(value, 'text/html');
};

export { getDOMParsedValueFromString };
