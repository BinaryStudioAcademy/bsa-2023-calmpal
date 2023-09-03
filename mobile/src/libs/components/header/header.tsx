import React from 'react';

import BackArrowImage from '#assets/img/icons/back-arrow.svg';
import { Text, TouchableOpacity, View } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
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

  const hasValue = Boolean(badgeCount);

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  return (
    <View style={[styles.header, isArrowVisible && styles.headerCenter]}>
      {isArrowVisible && (
        <TouchableOpacity style={styles.arrow} onPress={handleGoBack}>
          <BackArrowImage color={AppColor.BLUE_200} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {hasValue && <Badge count={badgeCount} />}
    </View>
  );
};

export { Header };
