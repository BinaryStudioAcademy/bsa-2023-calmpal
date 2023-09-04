declare module '*.svg' {
  import { type React } from 'react';

  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const source: string;
  const content: React.FC<SvgProps>;

  export { source };
  export { ReactComponent };
  export = content;
}

declare module '*.png' {
  import { type ImageSourcePropType } from 'react-native';

  const content: ImageSourcePropType;

  export = content;
}
