type Parameters = {
  template: string;
  replacements: Record<string, unknown>;
  wrapWith?: ((value: string) => string) | undefined;
};

const wrapWithDefault = (value: string): string => {
  return `{${value}}`;
};

const replaceTemplateWithValue = (parameters: Parameters): string => {
  const { template, replacements, wrapWith = wrapWithDefault } = parameters;
  let result = template;

  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.replaceAll(wrapWith(placeholder), String(value));
  }

  return result;
};

export { replaceTemplateWithValue };
