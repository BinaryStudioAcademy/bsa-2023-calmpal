import { type DeleteAccountFormPayload } from '../types/delete-account-form-payload.js';

const DEFAULT_DELETE_ACCOUNT_PAYLOAD: DeleteAccountFormPayload = {
  describeYourSituation: '',
  checkboxes: {
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  },
};

const CHECKBOX_OPTIONS = [
  { name: 'checkbox1', label: 'I have chosen another app' },
  { name: 'checkbox2', label: 'I have reached my goal' },
  { name: 'checkbox3', label: 'I can not afford the current pricing' },
  { name: 'checkbox4', label: 'Other' },
] as const;

export { CHECKBOX_OPTIONS, DEFAULT_DELETE_ACCOUNT_PAYLOAD };
export { type DeleteAccountFormPayload } from '../types/delete-account-form-payload.js';
