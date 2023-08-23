import { type Entity } from '#libs/types/types.js';

class SurveyEntity implements Entity {
  private id: number | null;

  private userId: number | null;

  private preferences: string[] | null;

  private createdAt: string | null;

  private updatedAt: string | null;

  private constructor({
    id,
    userId,
    preferences,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    userId: number;
    preferences: string[] | null;
    createdAt: string | null;
    updatedAt: string | null;
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
    createdAt: string;
    updatedAt: string;
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
    createdAt: string;
    updatedAt: string;
  } {
    return {
      id: this.id as number,
      userId: this.userId as number,
      preferences: this.preferences as string[],
      createdAt: this.createdAt as string,
      updatedAt: this.updatedAt as string,
    };
  }

  public toNewObject(): {
    userId: number;
    preferences: string[];
  } {
    return {
      userId: this.userId as number,
      preferences: this.preferences as string[],
    };
  }
}

export { SurveyEntity };
