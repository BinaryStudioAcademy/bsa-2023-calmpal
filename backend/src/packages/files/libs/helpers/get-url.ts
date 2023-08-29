function generateUrl(
  template: string,
  placeholders: Record<string, string>,
): string {
  let url = template;
  for (const key in placeholders) {
    if (Object.hasOwnProperty.call(placeholders, key)) {
      const value = placeholders[key];
      if (value !== undefined) {
        url = url.replace(`{${key}}`, value);
      }
    }
  }

  return url;
}

export { generateUrl };
