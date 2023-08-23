import { toast } from 'react-toastify';

const NotificationService = {
  error(message: string): void {
    toast.error(message);
  },
};

export { NotificationService };
