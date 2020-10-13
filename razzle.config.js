const path = require("path");
process.env.VERBOSE = "true";
module.exports = {
  plugins: ["typescript"],
  // modifyOptions({
  //   webpackObject, // the imported webpack node module
  //   options: {
  //     pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
  //     razzleOptions, // the default options/ options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
  //   },
  // }) {
  //   // console.log("razzleOptions");
  //   // console.log(razzleOptions);
  //   // Do some stuff...
  //   return razzleOptions;
  // },
  // modifyPaths({
  //   webpackObject, // the imported webpack node module
  //   options: {
  //     pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
  //     razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
  //   },
  //   paths, // the default paths that will be used by Razzle.
  // }) {
  //   // console.log("paths");
  //   // console.log(paths);
  //   paths.appServerIndexJs = path.resolve(__dirname, "src/server");

  //   // Do some stuff...
  //   return paths;
  // },
  // modifyWebpackOptions({
  //   env: {
  //     target, // the target 'node' or 'web'
  //     dev, // is this a development build? true or false
  //   },
  //   webpackObject, // the imported webpack node module
  //   options: {
  //     pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
  //     razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
  //     webpackOptions, // the default options that will be used to configure webpack/ webpack loaders and plugins
  //   },
  //   paths, // the modified paths that will be used by Razzle.
  // }) {
  //   if (target === "web") {
  //     // client only
  //   }
  //   if (target === "node") {
  //     // server only
  //   }
  //   if (dev) {
  //     // dev only
  //   } else {
  //     // prod only
  //   }

  //   // console.log("webpackOptions");
  //   // console.log(webpackOptions);
  //   // Do some stuff...
  //   return webpackOptions;
  // },
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

    // console.log("webpackConfig");
    // console.log(webpackConfig);
    // console.log("paths");
    // console.log(paths);
    paths.appServerIndexJs = path.resolve(__dirname, "src/server");

    // Do some stuff...
    return webpackConfig;
  },
  // modifyJestConfig({
  //   jestConfig, // the created jest config
  //   webpackObject, // the imported webpack node module
  //   options: {
  //     pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
  //     razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
  //   },
  //   paths, // the modified paths that will be used by Razzle.
  // }) {
  //   // console.log("jestConfig");
  //   // console.log(jestConfig);
  //   // Do some stuff...
  //   return jestConfig;
  // },
};
