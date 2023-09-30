import {
  DELETE_ACCOUNT_OTHER_CATEGORY,
  type DeleteAccountFormPayload,
} from '#packages/users/users.js';

import { DeleteAccountPayloadKey } from '../enums/enums.js';

const DEFAULT_DELETE_ACCOUNT_PAYLOAD: DeleteAccountFormPayload = {
  [DeleteAccountPayloadKey.DESCRIPTION]: '',
  [DeleteAccountPayloadKey.CHECKBOXES]: [],
};

const CHECKBOX_OPTIONS = [
  { label: 'I have chosen another app' },
  { label: 'I have reached my goal' },
  { label: 'I can not afford the current pricing' },
  { label: DELETE_ACCOUNT_OTHER_CATEGORY },
] as const;

export { CHECKBOX_OPTIONS, DEFAULT_DELETE_ACCOUNT_PAYLOAD };
