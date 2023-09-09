import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { type ImageSourcePropType } from 'react-native';

import cardImagePlaceholder from '#assets/img/card-image-placeholder.png';
import Play from '#assets/img/icons/play.svg';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from '#libs/components/components';
import { AppColor, MeditationScreenName } from '#libs/enums/enums';
import { useNavigation } from '#libs/hooks/hooks';
import { type MeditationNavigationParameterList } from '#libs/types/types';

import { styles } from './styles';

type Properties = {
  title: string;
  duration: number;
  img?: ImageSourcePropType;
};

const MeditationItem: React.FC<Properties> = ({
  title,
  duration,
  img = cardImagePlaceholder,
}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MeditationNavigationParameterList>
    >();

  const handleSetPlaylist = (): void => {
    navigation.navigate(MeditationScreenName.MEDITATION);
  };

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.duration}>{duration} min</Text>
        </View>
        <TouchableOpacity onPress={handleSetPlaylist}>
          <View style={styles.playButton}>
            <Play color={AppColor.WHITE} width={12} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { MeditationItem };
