import React from 'react';

const JournalingExperienceStep = React.lazy(() => {
  return import(
    '../components/journaling-experience-step/journaling-experience-step.js'
  ).then((module) => {
    return { default: module.JournalingExperienceStep };
  });
});

const FeelingsStep = React.lazy(() => {
  return import('../components/feelings-step/feelings-step.js').then(
    (module) => {
      return { default: module.FeelingsStep };
    },
  );
});

const MeditationExperienceStep = React.lazy(() => {
  return import(
    '../components/meditation-experience-step/meditation-experience-step.js'
  ).then((module) => {
    return { default: module.MeditationExperienceStep };
  });
});

const PreferencesStep = React.lazy(() => {
  return import('../components/preferences-step/preferences-step.js').then(
    (module) => {
      return { default: module.PreferencesStep };
    },
  );
});

const GoalsStep = React.lazy(() => {
  return import('../components/goals-step/goals-step.js').then((module) => {
    return { default: module.GoalsStep };
  });
});

const WorriesStep = React.lazy(() => {
  return import('../components/worries-step/worries-step.js').then((module) => {
    return { default: module.WorriesStep };
  });
});

const SurveySteps = {
  preferences: PreferencesStep,
  feelings: FeelingsStep,
  goals: GoalsStep,
  worries: WorriesStep,
  meditationExperience: MeditationExperienceStep,
  journalingExperience: JournalingExperienceStep,
};

export { SurveySteps };
