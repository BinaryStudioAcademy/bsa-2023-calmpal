const FIRST_INDEX = 0;

const START_TIME = 0;
const FULL_PERCENTAGE = 100;
const STEP = 1;
const SKIP_STEP = 30;
const PROGRESS_BAR = '--player-progress';

type Meditation = {
  id: number;
  title: string;
  purpose: string;
  src: string;
  img: string;
};

export {
  FIRST_INDEX,
  FULL_PERCENTAGE,
  type Meditation,
  PROGRESS_BAR,
  SKIP_STEP,
  START_TIME,
  STEP,
};
