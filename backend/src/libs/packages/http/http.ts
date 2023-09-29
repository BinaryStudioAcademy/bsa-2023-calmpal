import { BaseHttp } from './base-http.package.js';

const http = new BaseHttp();

export { http };
export { BaseHttp } from './base-http.package.js';
export { HTTPCode } from './libs/enums/enums.js';
export { HTTPError } from './libs/exceptions/exceptions.js';
export { type HTTP, HTTPHeader, type HTTPMethod } from './libs/types/types.js';
