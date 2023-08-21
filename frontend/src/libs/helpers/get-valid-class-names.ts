import { type ClassValue, clsx } from 'clsx';

const getValidClassNames = (...inputs: ClassValue[]): string => clsx(...inputs);

export { getValidClassNames };
