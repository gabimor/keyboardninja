const path = require("path");
// const heroku = require("razzle-heroku"),

module.exports = {
  plugins: ["typescript"],
  // modify: require("razzle-heroku"),
  modify(baseConfig, { target, dev }, webpack) {
    // const config = heroku(baseConfig, { target, dev }, webpack)

    const config = { ...baseConfig };

    config.devtool = dev ? "inline-source-map" : "none";
    config.resolve.alias["@client"] = path.resolve("./src/client/");
    config.resolve.alias["@server"] = path.resolve("./src/server/");
    config.resolve.alias["@src"] = path.resolve("./src/");

    if (config.target === "node") {
      config.entry[2] += "/server";
    }

    return config;
  },
};
