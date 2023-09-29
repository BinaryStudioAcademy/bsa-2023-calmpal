import { type DeleteAccountFormPayload } from '#packages/users/users.js';

import {
  DeleteAccountConfirmation,
  DeleteAccountForm,
  DeleteAccountMessage,
} from '../components/components.js';

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
  description: '',
  checkboxes: [],
};

const CHECKBOX_OPTIONS = [
  { label: 'I have chosen another app' },
  { label: 'I have reached my goal' },
  { label: 'I can not afford the current pricing' },
  { label: 'Other' },
] as const;

const OTHER_OPTION_CHECKBOX = 3;
const OTHER_OPTION_LABEL = CHECKBOX_OPTIONS[OTHER_OPTION_CHECKBOX].label;

const INITIAL_STEP = 0;
const NEXT_STEP_INCREMENT = 1;
const NO_CHECKED_BOXES = 0;

export {
  CHECKBOX_OPTIONS,
  DEFAULT_DELETE_ACCOUNT_PAYLOAD,
  INITIAL_STEP,
  NEXT_STEP_INCREMENT,
  NO_CHECKED_BOXES,
  OTHER_OPTION_LABEL,
  STEPS,
};
export { type DeleteAccountFormPayload } from 'shared/build/packages/users/users.js';
