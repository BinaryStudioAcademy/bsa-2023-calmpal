function generateUrl(
  template: string,
  placeholders: Record<string, string>,
): string {
  let url = template;

  Object.keys(placeholders).forEach((key) => {
    if (Object.hasOwn(placeholders, key)) {
      const value = placeholders[key];
      if (value !== undefined) {
        url = url.replace(`{${key}}`, value);
      }
    }
  });

  return url;
}

export { generateUrl };
