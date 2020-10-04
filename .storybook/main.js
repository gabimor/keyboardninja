const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpack,
};

async function webpack(baseConfig, options) {
  const config = { ...baseConfig };
  config.resolve.alias["@client"] = path.resolve("./src/client/");
  config.resolve.alias["@server"] = path.resolve("./src/server/");
  config.resolve.alias["@src"] = path.resolve("./src/");
  return config;
}
