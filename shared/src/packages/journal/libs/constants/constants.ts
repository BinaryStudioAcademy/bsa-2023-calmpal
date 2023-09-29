import { type IOptions } from 'sanitize-html';

const NOTE_SANITIZER_OPTIONS: IOptions = {
  allowedTags: ['p', 'span', 'br'],
  allowedAttributes: {
    p: ['dir'],
    span: ['style'],
  },
};

export { NOTE_SANITIZER_OPTIONS };
