import { type STEPS } from '../constants/constants.js';

type FeelingInputDto = {
  feelings: string[];
};

type GoalInputDto = {
  goals: string[];
  other: string;
};

type JournalingExperienceInputDto = {
  journalingExperience: string;
};

type MeditationExperienceInputDto = {
  meditationExperience: string;
};

type PreferenceInputDto = {
  preferences: string[];
  other: string;
};

type WorryInputDto = {
  worries: string[];
  other: string;
};

type Step = (typeof STEPS)[number];

export {
  type FeelingInputDto,
  type GoalInputDto,
  type JournalingExperienceInputDto,
  type MeditationExperienceInputDto,
  type PreferenceInputDto,
  type Step,
  type WorryInputDto,
};
