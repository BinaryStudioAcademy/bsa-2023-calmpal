import sanitizeHtml, {
  type IOptions as SanitizeHtmlOptions,
} from 'sanitize-html';

const sanitizeInput = (
  input: string,
  options?: SanitizeHtmlOptions,
): string => {
  const charactersToRemove = /[&<>]/g;
  const cleanedInput = input.replaceAll(charactersToRemove, '');
  const defaultOptions: SanitizeHtmlOptions = {
    allowedTags: [],
    allowedAttributes: {},
  };

  return sanitizeHtml(cleanedInput, {
    ...defaultOptions,
    ...options,
  });
};

export { sanitizeInput };
