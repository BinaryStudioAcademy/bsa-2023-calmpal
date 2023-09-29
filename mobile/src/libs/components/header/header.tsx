import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import {
  BackButton,
  IconButton,
  Text,
  View,
} from '#libs/components/components';
import { AppColor, ProfileScreenName } from '#libs/enums/enums';
import { useAppRoute, useNavigation } from '#libs/hooks/hooks';
import { type ProfileNavigationParameterList } from '#libs/types/types';

import { Badge } from './components/components';
import { DEFAULT_BADGE_COUNT } from './libs/constants/constants';
import { styles } from './styles';

type Properties = {
  title?: string;
  isArrowVisible?: boolean;
  badgeCount?: number;
  isProfileVisible?: boolean;
  fontSize?: 'small' | 'large';
};

const Header: React.FC<Properties> = ({
  title,
  isArrowVisible = false,
  badgeCount = DEFAULT_BADGE_COUNT,
  isProfileVisible = false,
  fontSize = 'large',
}) => {
  const navigation =
    useNavigation<NavigationProp<ProfileNavigationParameterList>>();
  const { name } = useAppRoute();

  const hasValue = Boolean(badgeCount);

  const handleIconPress = (): void => {
    navigation.navigate(ProfileScreenName.PROFILE);
  };

  return (
    <View
      style={[
        styles.header,
        isArrowVisible && styles.headerCenter,
        isProfileVisible && styles.settings,
      ]}
    >
      {isArrowVisible && <BackButton />}

      <View style={styles.titleBadgeContainer}>
        <Text
          style={fontSize === 'small' ? styles.smallTitle : styles.largeTitle}
        >
          {title ?? name}
        </Text>
        {hasValue && <Badge count={badgeCount} />}
      </View>
      {isProfileVisible && (
        <View style={styles.settingsContainer}>
          <IconButton
            onPress={handleIconPress}
            color={AppColor.BLUE_300}
            iconName="user"
          />
        </View>
      )}
    </View>
  );
};

export { Header };
