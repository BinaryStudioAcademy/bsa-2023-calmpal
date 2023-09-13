import React from 'react';

import { Icon, TouchableOpacity } from '#libs/components/components';
import { AppColor } from '#libs/enums/enums';
import { useNavigation } from '#libs/hooks/hooks';

import { styles } from './styles';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = (): void => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.arrow} onPress={handleGoBack}>
      <Icon color={AppColor.BLUE_200} name="back-arrow" />
    </TouchableOpacity>
  );
};

export { BackButton };
