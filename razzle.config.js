const path = require("path");

module.exports = {
  plugins: ["typescript"],
  modify: require("razzle-heroku"),
  // modify(config, { target, dev }, webpack) {
  //   config.devtool = dev ? "eval-source-map" : "none"
  // },
};
