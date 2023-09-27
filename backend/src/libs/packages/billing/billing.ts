import { config } from '../config/config.js';
import { Billing } from './billing.package.js';

const billing = new Billing({ secretKey: config.ENV.STRIPE.SECRET_KEY });

export { billing };
export { type Billing } from './billing.package.js';
