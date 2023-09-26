import { type SurveyNavigationParameterList } from './survey-navigation-parameter-list.type';

type SurveyNavigationItem = {
  name: keyof SurveyNavigationParameterList;
  component: React.ComponentType;
};

export { type SurveyNavigationItem };
