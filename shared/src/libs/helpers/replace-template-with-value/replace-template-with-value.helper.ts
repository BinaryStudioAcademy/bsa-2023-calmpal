const replaceTemplateWithValue = (
  template: string,
  replacements: Record<string, string | number>,
): string => {
  let result = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.replaceAll(`{${placeholder}}`, String(value));
  }

  return result;
};

export { replaceTemplateWithValue };
