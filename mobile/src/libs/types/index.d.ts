declare module '*.svg' {
  import { type ComponentType, type SVGProps } from 'react';

  const content: ComponentType<SVGProps>;

  export { content };
}
