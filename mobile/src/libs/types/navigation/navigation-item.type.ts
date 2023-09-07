import { type RootNavigationParameterList } from './root-navigation-parameter-list.type';

type NavigationItem = {
  name: keyof RootNavigationParameterList;
  component: React.ComponentType;
  checkShouldBeRendered: (...argument: boolean[]) => boolean;
};

export { type NavigationItem };
