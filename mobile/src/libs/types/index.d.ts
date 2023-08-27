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

declare module 'lodash/debounce' {
  const debounce: (
    function_: T,
    wait: number,
    options?: {
      leading?: boolean;
      trailing?: boolean;
      maxWait?: number;
    },
  ) => (...arguments_: Parameters<T>) => void;

  export = debounce;
}
