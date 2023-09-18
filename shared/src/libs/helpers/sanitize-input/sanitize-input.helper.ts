import sanitizeHtml, {
  type IOptions as SanitizeHtmlOptions,
} from 'sanitize-html';

const sanitizeInput = (
  input: string,
  options?: SanitizeHtmlOptions,
): string => {
  const defaultOptions: SanitizeHtmlOptions = {
    allowedTags: [],
    allowedAttributes: {},
  };

  return sanitizeHtml(input, {
    ...defaultOptions,
    ...options,
  });
};

export { sanitizeInput };
