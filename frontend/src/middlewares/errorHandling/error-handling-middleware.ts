import { type Middleware, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

type RejectedAction = PayloadAction<
  unknown,
  string,
  unknown,
  Error | undefined
>;

const handleAction =
  (next: (action: RejectedAction) => RejectedAction) =>
  (action: RejectedAction): RejectedAction => {
    if (action.type.endsWith('/rejected') && action.error) {
      toast.error(action.error.message);
    }
    return next(action);
  };

const errorHandlingMiddleware: Middleware = () => handleAction;

export { errorHandlingMiddleware };
