import { type DeleteAccountFormPayload } from '~/packages/users/users.js';

import { DeleteAccountPayloadKey } from '../enums/enums.js';

const DEFAULT_DELETE_ACCOUNT_PAYLOAD: DeleteAccountFormPayload = {
  [DeleteAccountPayloadKey.DESCRIPTION]: '',
  [DeleteAccountPayloadKey.CHECKBOXES]: [],
};

const CHECKBOX_OPTIONS = [
  { label: 'I have chosen another app' },
  { label: 'I have reached my goal' },
  { label: 'I can not afford the current pricing' },
  { label: 'Other' },
] as const;

const OTHER_OPTION_CHECKBOX = 3;
const OTHER_OPTION_LABEL = CHECKBOX_OPTIONS[OTHER_OPTION_CHECKBOX].label;
const NO_CHECKBOXES = 0;

export {
  CHECKBOX_OPTIONS,
  DEFAULT_DELETE_ACCOUNT_PAYLOAD,
  NO_CHECKBOXES,
  OTHER_OPTION_CHECKBOX,
  OTHER_OPTION_LABEL,
};
