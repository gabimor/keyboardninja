module.exports = {
  modify(config, { target, dev }, webpack) {
    config.devtool = dev ? "eval-source-map" : "none"

    console.log("config")
    console.log(config)
    console.log("target")
    console.log(target)
    console.log("dev")
    console.log(dev)
    console.log("webpack")
    console.log(webpack)
    return config
  },
}
