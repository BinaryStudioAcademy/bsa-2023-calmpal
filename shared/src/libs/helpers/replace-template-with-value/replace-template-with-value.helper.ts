const replaceTemplateWithValue = (
  template: string,
  replacements: Record<string, string | number>,
): string => {
  return template.replaceAll(/{([^}]+)}/, (_, placeholder) =>
    String(replacements[placeholder as string]),
  );
};

export { replaceTemplateWithValue };
