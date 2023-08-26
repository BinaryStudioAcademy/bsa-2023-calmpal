import { type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

type TabNavigatorOptions = {
  tabBarActiveTintColor: string;
  tabBarIcon: ({ color }: { color: string }) => React.ReactNode;
  headerStyle: StyleProp<ViewStyle>;
  headerTitleStyle: StyleProp<TextStyle>;
  tabBarInactiveTintColor: string;
  tabBarShowLabel: boolean;
  tabBarStyle: StyleProp<ViewStyle>;
};

export { type TabNavigatorOptions };
