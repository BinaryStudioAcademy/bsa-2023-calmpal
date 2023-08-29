import { toast } from 'react-toastify';

import { type ValueOf } from '#libs/types/types.js';

import { NotificationType } from './libs/enums/enums.js';

class Notification {
  public [NotificationType.ERROR](message: string): void {
    this.show(message, NotificationType.ERROR);
  }

  public [NotificationType.SUCCESS](message: string): void {
    this.show(message, NotificationType.SUCCESS);
  }

  public [NotificationType.WARNING](message: string): void {
    this.show(message, NotificationType.WARNING);
  }

  public [NotificationType.INFO](message: string): void {
    this.show(message, NotificationType.INFO);
  }

  private show(message: string, type: ValueOf<typeof NotificationType>): void {
    toast(message, { type });
  }
}

export { Notification };
