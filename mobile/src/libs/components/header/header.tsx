import {
  type NavigationProp,
  type ParamListBase,
} from '@react-navigation/native';
import React from 'react';

import BackArrowImage from '#assets/img/icons/back-arrow.svg';
import UserIcon from '#assets/img/icons/user.svg';
import { Text, TouchableOpacity, View } from '#libs/components/components';
import { RootScreenName } from '#libs/enums/enums';

import { IconButton } from '../icon-button/icon-button';
import { Badge } from './components/components';
import { DEFAULT_BADGE_COUNT } from './libs/constants';
import { styles } from './styles';

type Properties = {
  navigation: NavigationProp<ParamListBase>;
  title: string;
  isArrowVisible?: boolean;
  badgeCount?: number;
  isSettingsVisible?: boolean;
};

const Header: React.FC<Properties> = ({
  navigation,
  title,
  isArrowVisible = false,
  badgeCount = DEFAULT_BADGE_COUNT,
  isSettingsVisible = false,
}) => {
  const handleOnPress = (): void => {
    navigation.goBack();
  };
  const hasValue = Boolean(badgeCount);

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
        <TouchableOpacity style={styles.arrow} onPress={handleOnPress}>
          <BackArrowImage />
        </TouchableOpacity>
      )}
      <View style={styles.titleBadgeContainer}>
        <Text style={styles.title}>{title}</Text>
        {hasValue && <Badge count={badgeCount} />}
      </View>
      {isSettingsVisible && (
        <View style={styles.settingsContainer}>
          <IconButton onPress={handleIconPress} iconSourceSvg={<UserIcon />} />
        </View>
      )}
    </View>
  );
};

export { Header };
