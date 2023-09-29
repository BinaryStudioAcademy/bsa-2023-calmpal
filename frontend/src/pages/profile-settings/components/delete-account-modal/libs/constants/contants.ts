import {
  DeleteAccountConfirmation,
  DeleteAccountFinal,
  DeleteAccountForm,
} from '../../components/components.js';

const STEPS = [
  {
    component: DeleteAccountFinal,
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

const INITIAL_STEP = 0;
const NEXT_STEP_INCREMENT = 1;
const NO_CHECKED_BOXES = 0;

export { INITIAL_STEP, NEXT_STEP_INCREMENT, NO_CHECKED_BOXES, STEPS };
