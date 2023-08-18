const {
  getDefaultConfig,
  mergeConfig,
} = require('../node_modules/@react-native/metro-config');
const path = require('node:path');

const pathToShared = path.resolve(__dirname, '../shared/build/cjs');
const pathToWorkspaceNodeModules = path.resolve(__dirname, '../node_modules');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [pathToShared, pathToWorkspaceNodeModules],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
