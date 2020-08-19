const path = require("path");

module.exports = {
  plugins: ["typescript"],
  // modify: require("razzle-heroku"),
  modify(baseConfig, { target, dev }, webpack) {
    const config = { ...baseConfig };
    config.devtool = dev ? "eval-source-map" : "none";
    config.resolve.alias["@client"] = path.resolve("./src/client/");
    config.resolve.alias["@server"] = path.resolve("./src/server/");
    return config;
  },
};
