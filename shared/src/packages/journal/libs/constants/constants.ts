import { type IOptions } from 'sanitize-html';

const NOTE_SANITIZER_OPTIONS: IOptions = {
  allowedTags: ['p', 'span', 'br'],
  allowedAttributes: {
    p: ['dir'],
    span: ['style'],
  },
};

const TEXT_PATTERN = /^<p\b[^>]*>.*<\/p>$/;

const TEXT_PATTERN_NAME = 'textFormat';

export { NOTE_SANITIZER_OPTIONS, TEXT_PATTERN, TEXT_PATTERN_NAME };
