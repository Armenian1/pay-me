const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Causes files with a .cjs extension to be considered an asset.
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
