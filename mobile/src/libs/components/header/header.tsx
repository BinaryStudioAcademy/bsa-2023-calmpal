import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import BackArrowImage from '#assets/img/icons/back-arrow.svg';
import UserIcon from '#assets/img/icons/user.svg';
import { Text, TouchableOpacity, View } from '#libs/components/components';
import { AppColor, RootScreenName } from '#libs/enums/enums';
import { useAppRoute, useNavigation } from '#libs/hooks/hooks';
import { type RootNavigationParameterList } from '#libs/types/types';

import { IconButton } from '../icon-button/icon-button';
import { Badge } from './components/components';
import { DEFAULT_BADGE_COUNT } from './libs/constants';
import { styles } from './styles';

type Properties = {
  title?: string;
  isArrowVisible?: boolean;
  badgeCount?: number;
  isSettingsVisible?: boolean;
};

const Header: React.FC<Properties> = ({
  title,
  isArrowVisible = false,
  badgeCount = DEFAULT_BADGE_COUNT,
  isSettingsVisible = false,
}) => {
  const navigation =
    useNavigation<NavigationProp<RootNavigationParameterList>>();
  const { name } = useAppRoute();

  const hasValue = Boolean(badgeCount);

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  const handleIconPress = (): void => {
    navigation.navigate(RootScreenName.PROFILE);
  };

  return (
    <View
      style={[
        styles.header,
        isArrowVisible && styles.headerCenter,
        isSettingsVisible && styles.settings,
      ]}
    >
      {isArrowVisible && (
        <TouchableOpacity style={styles.arrow} onPress={handleGoBack}>
          <BackArrowImage color={AppColor.BLUE_200} />
        </TouchableOpacity>
      )}
      <View style={styles.titleBadgeContainer}>
        <Text style={styles.title}>{title ?? name}</Text>
        {hasValue && <Badge count={badgeCount} />}
      </View>
      {isSettingsVisible && (
        <View style={styles.settingsContainer}>
          <IconButton
            onPress={handleIconPress}
            iconSourceSvg={<UserIcon color={AppColor.BLUE_300} />}
          />
        </View>
      )}
    </View>
  );
};

export { Header };
