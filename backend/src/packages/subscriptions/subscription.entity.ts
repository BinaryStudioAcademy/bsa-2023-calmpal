import { type Entity } from '#libs/types/types.js';

class SubscriptionEntity implements Entity {
  private id: number | null;

  private endDate: Date;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private constructor({
    id,
    endDate,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    endDate: Date;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    endDate,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    endDate: Date;
    createdAt: Date | null;
    updatedAt: Date | null;
  }): SubscriptionEntity {
    return new SubscriptionEntity({ id, endDate, createdAt, updatedAt });
  }

  public static initializeNew({
    endDate,
  }: {
    endDate: Date;
  }): SubscriptionEntity {
    return new SubscriptionEntity({
      id: null,
      endDate,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      endDate: this.endDate,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): { endDate: Date } {
    return {
      endDate: this.endDate,
    };
  }
}

export { SubscriptionEntity };
