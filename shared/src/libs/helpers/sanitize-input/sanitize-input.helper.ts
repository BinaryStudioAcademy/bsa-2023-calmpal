import sanitizeHtml, { type IOptions } from 'sanitize-html';

const sanitizeInput = (input: string, options?: IOptions): string => {
  const charactersToRemove = /[&<>]/g;
  const cleanedInput = input.replaceAll(charactersToRemove, '');
  const defaultOptions: IOptions = {
    allowedTags: [],
    allowedAttributes: {},
  };

  return sanitizeHtml(cleanedInput, {
    ...defaultOptions,
    ...options,
  });
};

export { sanitizeInput };
