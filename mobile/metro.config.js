const {
  getDefaultConfig,
  mergeConfig,
} = require('../node_modules/@react-native/metro-config');
const path = require('node:path');

const pathToShared = path.resolve(__dirname, '../shared/build/cjs');
const pathToWorkspaceNodeModules = path.resolve(__dirname, '../node_modules');
const { assetExts, sourceExts } = getDefaultConfig(__dirname).resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [pathToShared, pathToWorkspaceNodeModules],
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((extension) => extension !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
