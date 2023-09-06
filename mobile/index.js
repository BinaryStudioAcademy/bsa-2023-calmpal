import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import { App } from './src/libs/components/components';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
