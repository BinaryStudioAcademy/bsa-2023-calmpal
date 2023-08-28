import { type ControllerRenderProps as ControllerRenderProperties } from './types.js';

type ChatInputProperties = {
  field: ControllerRenderProperties<
    {
      text: string;
    },
    'text'
  >;
};

export { type ChatInputProperties };
