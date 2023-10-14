import { type Entity } from '~/libs/types/types.js';

class SurveyEntity implements Entity {
  private id: number | null;

  private userId: number | null;

  private preferences: string[];

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private constructor({
    id,
    userId,
    preferences,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    userId: number;
    preferences: string[];
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.userId = userId;
    this.preferences = preferences;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    userId,
    preferences,
    createdAt,
    updatedAt,
  }: {
    id: number;
    userId: number;
    preferences: string[];
    createdAt: Date;
    updatedAt: Date;
  }): SurveyEntity {
    return new SurveyEntity({
      id,
      userId,
      preferences,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    userId,
    preferences,
  }: {
    userId: number;
    preferences: string[];
  }): SurveyEntity {
    return new SurveyEntity({
      id: null,
      userId,
      preferences,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    userId: number;
    preferences: string[];
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      userId: this.userId as number,
      preferences: this.preferences,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    userId: number;
    preferences: string[];
  } {
    return {
      userId: this.userId as number,
      preferences: this.preferences,
    };
  }
}

export { SurveyEntity };
