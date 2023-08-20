const mergeStyles = (newStyle?: string, defaultStyle?: string): string =>
  `${defaultStyle ?? ''} ${newStyle ?? ''}`;

export { mergeStyles };
