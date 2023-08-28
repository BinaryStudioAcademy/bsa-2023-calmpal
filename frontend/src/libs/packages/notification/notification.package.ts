import { toast } from 'react-toastify';

import { type ValueOf } from '#libs/types/types.js';

import { NotificationType } from './libs/enums/notification-type.enum.js';

class Notification {
  public [NotificationType.ERROR](message: string): void {
    this.show(message, 'error');
  }

  public [NotificationType.SUCCESS](message: string): void {
    this.show(message, 'success');
  }

  public [NotificationType.WARNING](message: string): void {
    this.show(message, 'warning');
  }

  public [NotificationType.INFO](message: string): void {
    this.show(message, 'info');
  }

  private show(message: string, type: ValueOf<typeof NotificationType>): void {
    toast(message, { type });
  }
}

export { Notification };
