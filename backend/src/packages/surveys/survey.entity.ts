import { type Entity } from '#libs/types/types.js';

class SurveyEntity implements Entity {
  private id: number | null;

  private userId: number | null;

  private preferences: string[];

  private feelings: string[] | null;

  private goals: string[] | null;

  private worries: string[] | null;

  private meditationExperience: string | null;

  private journalingExperience: string | null;

  private createdAt: Date | null;

  private updatedAt: Date | null;

  private constructor({
    id,
    userId,
    preferences,
    feelings,
    goals,
    worries,
    meditationExperience,
    journalingExperience,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    userId: number;
    preferences: string[];
    feelings: string[] | null;
    goals: string[] | null;
    worries: string[] | null;
    meditationExperience: string | null;
    journalingExperience: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }) {
    this.id = id;
    this.userId = userId;
    this.preferences = preferences;
    this.feelings = feelings;
    this.goals = goals;
    this.worries = worries;
    this.meditationExperience = meditationExperience;
    this.journalingExperience = journalingExperience;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    userId,
    preferences,
    feelings,
    goals,
    worries,
    meditationExperience,
    journalingExperience,
    createdAt,
    updatedAt,
  }: {
    id: number;
    userId: number;
    preferences: string[];
    feelings: string[] | null;
    goals: string[] | null;
    worries: string[] | null;
    meditationExperience: string | null;
    journalingExperience: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): SurveyEntity {
    return new SurveyEntity({
      id,
      userId,
      preferences,
      feelings,
      goals,
      worries,
      meditationExperience,
      journalingExperience,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    userId,
    preferences,
    feelings,
    goals,
    worries,
    meditationExperience,
    journalingExperience,
  }: {
    userId: number;
    preferences: string[];
    feelings: string[] | null;
    goals: string[] | null;
    worries: string[] | null;
    meditationExperience: string | null;
    journalingExperience: string | null;
  }): SurveyEntity {
    return new SurveyEntity({
      id: null,
      userId,
      preferences,
      feelings,
      goals,
      worries,
      meditationExperience,
      journalingExperience,
      createdAt: null,
      updatedAt: null,
    });
  }

  public toObject(): {
    id: number;
    userId: number;
    preferences: string[];
    feelings: string[] | null;
    goals: string[] | null;
    worries: string[] | null;
    meditationExperience: string | null;
    journalingExperience: string | null;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id as number,
      userId: this.userId as number,
      preferences: this.preferences,
      feelings: this.feelings,
      goals: this.goals,
      worries: this.worries,
      meditationExperience: this.meditationExperience,
      journalingExperience: this.journalingExperience,
      createdAt: this.createdAt as Date,
      updatedAt: this.updatedAt as Date,
    };
  }

  public toNewObject(): {
    userId: number;
    preferences: string[];
    feelings: string[] | null;
    goals: string[] | null;
    worries: string[] | null;
    meditationExperience: string | null;
    journalingExperience: string | null;
  } {
    return {
      userId: this.userId as number,
      preferences: this.preferences,
      feelings: this.feelings,
      goals: this.goals,
      worries: this.worries,
      meditationExperience: this.meditationExperience,
      journalingExperience: this.journalingExperience,
    };
  }
}

export { SurveyEntity };
