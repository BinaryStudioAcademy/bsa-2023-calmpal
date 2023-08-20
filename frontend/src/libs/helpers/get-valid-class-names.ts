import clsx from 'clsx';

const getValidClassNames = (newStyle?: string, defaultStyle?: string): string =>
  clsx(defaultStyle, newStyle);

export { getValidClassNames };
