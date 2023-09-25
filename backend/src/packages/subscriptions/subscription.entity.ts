import { type Entity } from '#libs/types/types.js';

class SubscriptionEntity implements Entity {
  private id: number | null;

  private endDate: Date;

  private constructor({ id, endDate }: { id: number | null; endDate: Date }) {
    this.id = id;
    this.endDate = endDate;
  }

  public static initialize({
    id,
    endDate,
  }: {
    id: number | null;
    endDate: Date;
  }): SubscriptionEntity {
    return new SubscriptionEntity({ id, endDate });
  }

  public static initializeNew({
    endDate,
  }: {
    endDate: Date;
  }): SubscriptionEntity {
    return new SubscriptionEntity({ id: null, endDate });
  }

  public toObject(): { id: number; endDate: Date } {
    return {
      id: this.id as number,
      endDate: this.endDate,
    };
  }

  public toNewObject(): { endDate: Date } {
    return {
      endDate: this.endDate,
    };
  }
}

export { SubscriptionEntity };
