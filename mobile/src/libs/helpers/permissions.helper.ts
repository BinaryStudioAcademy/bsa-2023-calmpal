import { PermissionsAndroid } from 'react-native';

const requestMediaPermissions = async (): Promise<boolean> => {
  try {
    const readMediaAudio = 'android.permission.READ_MEDIA_AUDIO';
    const readExternalStorage = 'android.permission.READ_EXTERNAL_STORAGE';

    const grantedReadAudio = await PermissionsAndroid.check(readMediaAudio);
    const grantedReadStorage = await PermissionsAndroid.check(
      readExternalStorage,
    );

    if (!grantedReadAudio || !grantedReadStorage) {
      const result = await PermissionsAndroid.requestMultiple([
        readExternalStorage,
        readMediaAudio,
      ]);

      return (
        result[readExternalStorage] === PermissionsAndroid.RESULTS['GRANTED'] ||
        result[readMediaAudio] === PermissionsAndroid.RESULTS['GRANTED']
      );
    }

    return true;
  } catch {
    return false;
  }
};

export { requestMediaPermissions };
