const path = require("path");
module.exports = {
  plugins: ["typescript"],
  modifyWebpackConfig({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    webpackConfig, // the created webpack config
    webpackObject, // the imported webpack node module
    options: {
      pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
      webpackOptions, // the modified options that was used to configure webpack/ webpack loaders and plugins
    },
    paths, // the modified paths that will be used by Razzle.
  }) {
    if (target === "web") {
      // client only
    }
    if (target === "node") {
      // server only
    }
    if (dev) {
      // dev only
    } else {
      // prod only
    }

    // const indexDefinePlugin = webpackConfig.plugins.findIndex(
    //   (plugin) => plugin.constructor.name === "DefinePlugin"
    // );

    // const newDefs = { ...webpackConfig.plugins[indexDefinePlugin] };

    // delete newDefs["process.env.PORT"];

    // // webpackConfig.plugins[indexDefinePlugin] = new webpack.DefinePlugin(
    // //   newDefs
    // // );

    // console.log(
    //   JSON.stringify(webpackConfig.plugins),
    //   webpackConfig.plugins[indexDefinePlugin],
    //   indexDefinePlugin
    // );

    paths.appServerIndexJs = path.resolve(__dirname, "src/server");

    return webpackConfig;
  },
};
