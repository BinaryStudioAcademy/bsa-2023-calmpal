const replaceTemplateWithValue = (
  template: string,
  replacements: Record<string, string | number>,
): string => {
  return template.replaceAll(/{{([^}]+)}}/g, (_, placeholder) =>
    String(replacements[placeholder as string]),
  );
};

export { replaceTemplateWithValue };
