const DEFAULT_NOTE_PAYLOAD = {
  title: 'New note',
  text: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
};

const SAVE_NOTE_TIMEOUT = 2000;

export { DEFAULT_NOTE_PAYLOAD, SAVE_NOTE_TIMEOUT };
export { NOTE_SANITIZER_OPTIONS } from 'shared/build/index.js';
