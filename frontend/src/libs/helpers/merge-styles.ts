type Style = string | undefined;

const mergeStyles = (newStyle: Style, defaultStyle: Style): string =>
  `${defaultStyle ?? ''} ${newStyle ?? ''}`;

export { mergeStyles };
