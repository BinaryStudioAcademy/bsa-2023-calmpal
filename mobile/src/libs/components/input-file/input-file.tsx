import React from 'react';

import { AppColor } from '#libs/enums/enums';

import { Icon, Pressable, Text, View } from '../components';
import { styles } from './styles';

type Properties = {
  label: string;
};

const InputFile: React.FC<Properties> = ({ label }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.file}>
        <Icon name="upload" color={AppColor.GRAY_500} />
        <Text style={styles.primaryText}>CLICK HERE</Text>
        <Text style={styles.secondaryText}>Only MP3 extension is allowed</Text>
      </Pressable>
      <View style={styles.selectedFile}>
        <Icon name="download" color={AppColor.GRAY_600} />
        <Text style={styles.selectedFileName}>Meditation.mp3</Text>
      </View>
    </View>
  );
};

export { InputFile };
