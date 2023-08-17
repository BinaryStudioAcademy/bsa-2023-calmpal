const {
  getDefaultConfig,
  mergeConfig,
} = require('../node_modules/@react-native/metro-config');
const path = require('node:path');

const PATH_TO_WORKSPACE_NODE_MODULES = path.resolve(
  __dirname,
  '../node_modules',
);
const PATH_TO_SHARED = path.resolve(
  __dirname,
  '../node_modules/shared/build/cjs',
);

const extraNodeModules = {
  'shared': PATH_TO_SHARED,
};

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) => {
        return target[name] ?? path.join(PATH_TO_SHARED, name);
      },
    }),
  },
  watchFolders: [PATH_TO_WORKSPACE_NODE_MODULES, PATH_TO_SHARED],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
