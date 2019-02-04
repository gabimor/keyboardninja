import React from "react"
import { configure, addDecorator } from "@storybook/react"
import { configureViewport } from "@storybook/addon-viewport"

import Theme from "../pages/layout"

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
  <>
    <Theme />
    {story()}
  </>
))

// automatically import all files ending in *.stories.js
const pages = require.context("../pages", true, /.stories.js$/)
const componenets = require.context("../components", true, /.stories.js$/)
function loadStories() {
  pages.keys().forEach(filename => pages(filename))
  componenets.keys().forEach(filename => componenets(filename))
}

configure(loadStories, module)
