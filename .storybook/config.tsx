import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { configureViewport } from "@storybook/addon-viewport";
import { DataContext } from "../src/client/DataContext";

import { style } from "../src/server/web/pageTemplate/style";
import { OSs } from "../src/server/db/oss";

// configureViewport({
//   viewports,
// });

// global decorator to add theme
addDecorator((story) => (
  <DataContext.Provider value={{ os: OSs.Mac }}>
    <div style={{ padding: 40 }}>
      <style>{style}</style>
      {story()}
    </div>
  </DataContext.Provider>
));

// automatically import all files ending in *.stories.js
const pages = require.context("../src", true, /.stories.js$/);
function loadStories() {
  pages.keys().forEach((filename) => pages(filename));
}

configure(loadStories, module);

const viewports = {
  responsive: {
    name: "Desktop",
    styles: {
      width: "100%",
      height: "100%",
    },
    type: "desktop",
  },
  iPad: {
    name: "iPad",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  Mobile360: {
    name: "Mobile 360",
    styles: {
      width: "360px",
      height: "740px",
    },
  },
  Mobile412: {
    name: "Mobile 412",
    styles: {
      width: "412px",
      height: "732px",
    },
  },
  Mobile480: {
    name: "Mobile 480",
    styles: {
      width: "480px",
      height: "732px",
    },
  },
};
