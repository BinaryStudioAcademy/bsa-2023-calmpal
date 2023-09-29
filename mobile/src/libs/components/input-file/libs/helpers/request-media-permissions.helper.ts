import { PermissionsAndroid } from 'react-native';

const requestMediaPermissions = async (): Promise<boolean> => {
  try {
    const READ_MEDIA_AUDIO_PERMISSION = 'android.permission.READ_MEDIA_AUDIO';
    const READ_EXTERNAL_STORAGE = 'android.permission.READ_EXTERNAL_STORAGE';

    const grantedReadAudio = await PermissionsAndroid.check(
      READ_MEDIA_AUDIO_PERMISSION,
    );
    const grantedReadStorage = await PermissionsAndroid.check(
      READ_EXTERNAL_STORAGE,
    );

    if (!grantedReadAudio || !grantedReadStorage) {
      const result = await PermissionsAndroid.requestMultiple([
        READ_EXTERNAL_STORAGE,
        READ_MEDIA_AUDIO_PERMISSION,
      ]);

      return (
        result[READ_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS['GRANTED'] ||
        result[READ_MEDIA_AUDIO_PERMISSION] ===
          PermissionsAndroid.RESULTS['GRANTED']
      );
    }

    return true;
  } catch {
    return false;
  }
};

export { requestMediaPermissions };
