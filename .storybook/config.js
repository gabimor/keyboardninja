import React from "react" // eslint-disable-line no-unused-vars
import { configure, addDecorator } from "@storybook/react"
import { configureViewport } from "@storybook/addon-viewport"

import { style } from "../src/server/page"

const viewports = {
  responsive: {
    name: "Responsive",
    styles: {
      width: "100%",
      height: "100%",
    },
    type: "desktop",
  },
  iPad: {
    name: "iPad",
    styles: {
      width: "1024px",
      height: "1366px",
    },
  },
  iPhone: {
    name: "iPhone X",
    styles: {
      width: "375px",
      height: "812px",
    },
  },
}

configureViewport({
  viewports,
})

// global decorator to add theme
addDecorator(story => (
  <div style={{ padding: 40 }}>
    <style>{style}</style>
    {story()}
  </div>
))

// automatically import all files ending in *.stories.js
const pages = require.context("../src", true, /.stories.js$/)
function loadStories() {
  pages.keys().forEach(filename => pages(filename))
}

configure(loadStories, module)
