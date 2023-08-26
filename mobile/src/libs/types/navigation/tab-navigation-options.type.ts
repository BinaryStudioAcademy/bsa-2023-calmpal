import { type StyleProp, type ViewStyle } from 'react-native';

type TabNavigatorOptions = {
  tabBarActiveTintColor: string;
  tabBarIcon: ({ color }: { color: string }) => React.ReactNode;
  headerStyle: StyleProp<ViewStyle>;
  tabBarInactiveTintColor: string;
  tabBarShowLabel: boolean;
  tabBarStyle: StyleProp<ViewStyle>;
};

export { type TabNavigatorOptions };
