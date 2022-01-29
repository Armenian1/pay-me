module.exports = function (api) {
  api.cache(true);
  return {
    // https://blog.logrocket.com/designing-a-ui-with-custom-theming-using-react-native-paper/
    presets: ["module:metro-react-native-babel-preset"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
