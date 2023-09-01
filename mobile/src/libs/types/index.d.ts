declare module '*.svg' {
  import { type SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;

  export = content;
}

declare module '*.png' {
  import { type ImageSourcePropType } from 'react-native';

  const content: ImageSourcePropType;

  export = content;
}
