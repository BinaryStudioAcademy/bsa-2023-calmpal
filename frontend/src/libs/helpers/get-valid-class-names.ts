import { type ClassValue } from 'clsx';
import clsx from 'clsx';

const getValidClassNames = (...inputs: ClassValue[]): string => clsx(...inputs);

export { getValidClassNames };
