import {
  DeleteAccountConfirmation,
  DeleteAccountForm,
  DeleteAccountMessage,
} from '#libs/components/modal/steps/delete-account/delete-account.js';

import { type DeleteAccountFormPayload } from '../../steps/delete-account/libs/types/delete-account-form-payload.js';

const STEPS = [
  {
    component: DeleteAccountMessage,
    title: 'We are sad that you are leaving',
  },
  {
    component: DeleteAccountForm,
    title: 'Please tell us why',
  },
  {
    component: DeleteAccountConfirmation,
    title: 'Your account will be deleted',
  },
];

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

const INITIAL_STEP = 0;
const NEXT_STEP_INCREMENT = 1;

export {
  CHECKBOX_OPTIONS,
  DEFAULT_DELETE_ACCOUNT_PAYLOAD,
  INITIAL_STEP,
  NEXT_STEP_INCREMENT,
  STEPS,
};
export { type DeleteAccountFormPayload } from '../../steps/delete-account/libs/types/delete-account-form-payload.js';
