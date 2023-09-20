import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary.js';

import { type ErrorBoundaryType } from '../libs/types/types.js';

const NoteErrorBoundary = LexicalErrorBoundary as unknown as ErrorBoundaryType;

export { NoteErrorBoundary };
export { LexicalComposer } from '@lexical/react/LexicalComposer.js';
export { ContentEditable } from '@lexical/react/LexicalContentEditable.js';
