import { BaseHttp } from './base-http.package.js';

const http = new BaseHttp();

export { http };
export { HTTPCode, HTTPHeader } from './libs/enums/enums.js';
export { HTTPError } from './libs/exceptions/exceptions.js';
export { type HTTP } from './libs/types/types.js';
export { type HTTPOptions } from './libs/types/types.js';
