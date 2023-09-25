import { type STEPS_DEFAULT_ORDER } from '../constants/constants.js';

type HandleFieldChangeType = {
  category: string;
  currentCategories: string[];
  stateValue: string[];
  defaultCategories: string[];
  isOther?: boolean;
  categoryChange: (value: string[]) => void;
  stateChange: (value: string[]) => void;
};

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

type Step = (typeof STEPS_DEFAULT_ORDER)[number];

type OnOther = {
  getOtherDefault: (categories: string[]) => string;
  getOthersCategories: (categories: string[], payload: string[]) => string[];
  hasOther: (category: string[]) => boolean;
};

export {
  type FeelingInputDto,
  type GoalInputDto,
  type HandleFieldChangeType,
  type JournalingExperienceInputDto,
  type MeditationExperienceInputDto,
  type OnOther,
  type PreferenceInputDto,
  type Step,
  type WorryInputDto,
};
