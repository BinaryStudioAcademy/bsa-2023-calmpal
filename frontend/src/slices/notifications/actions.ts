import { createAction } from '@reduxjs/toolkit';

const showErrorNotification = createAction<string>('showErrorNotification');

export { showErrorNotification };
