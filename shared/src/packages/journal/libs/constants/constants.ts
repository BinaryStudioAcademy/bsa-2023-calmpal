import { type IOptions } from 'sanitize-html';

const NOTE_SANITIZER_OPTIONS: IOptions = {
  allowedTags: ['p', 'span', 'br'],
  allowedAttributes: {
    p: ['dir'],
    span: ['style'],
  },
};

const DEFAULT_NOTE_PAYLOAD = {
  title: '',
  text: '<p><br /></p>',
};

export { DEFAULT_NOTE_PAYLOAD, NOTE_SANITIZER_OPTIONS };
