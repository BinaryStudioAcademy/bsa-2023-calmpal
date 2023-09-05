import React from 'react';

import { Text, View } from '#libs/components/components';
import { useAppRoute } from '#libs/hooks/hooks';

import { BackButton, Badge } from './components/components';
import { DEFAULT_BADGE_COUNT } from './libs/constants';
import { styles } from './styles';

type Properties = {
  title?: string;
  isArrowVisible?: boolean;
  badgeCount?: number;
};

const Header: React.FC<Properties> = ({
  title,
  isArrowVisible = false,
  badgeCount = DEFAULT_BADGE_COUNT,
}) => {
  const { name } = useAppRoute();

  const hasValue = Boolean(badgeCount);

  return (
    <View style={[styles.header, isArrowVisible && styles.headerCenter]}>
      {isArrowVisible && <BackButton />}
      <Text style={styles.title}>{title ?? name}</Text>
      {hasValue && <Badge count={badgeCount} />}
    </View>
  );
};

export { Header };
