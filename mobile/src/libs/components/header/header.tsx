import React from 'react';

import BackArrawImage from '#assets/img/icons/back-arrow.svg';
import { Text, TouchableOpacity, View } from '#libs/components/components';
import { useNavigation } from '#libs/hooks/hooks';

import { Badge } from './components/components';
import { DEFAULT_BADGE_COUNT } from './libs/constants';
import { styles } from './styles';

type Properties = {
  title: string;
  isArrowVisible?: boolean;
  badgeCount?: number;
};

const Header: React.FC<Properties> = ({
  title,
  isArrowVisible = false,
  badgeCount = DEFAULT_BADGE_COUNT,
}) => {
  const navigation = useNavigation();
  const handleOnPress = (): void => {
    navigation.goBack();
  };
  const hasValue = Boolean(badgeCount);

  return (
    <View style={[styles.header, isArrowVisible && styles.headerCenter]}>
      {isArrowVisible && (
        <TouchableOpacity style={styles.arrow} onPress={handleOnPress}>
          <BackArrawImage />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {hasValue && <Badge count={badgeCount} />}
    </View>
  );
};

export { Header };
