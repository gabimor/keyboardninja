import React from "react";
import { DataContext } from "../src/client/DataContext";
import { style } from "../src/server/web/pageTemplate/style";
import { OSs } from "../src/types/OSs.enum";
import StoryRouter from "storybook-react-router";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

const contextData = { os: OSs.Mac, app: { oss: ["mac", "win"] } };

const storyStyle = `
  html {background-color:inherit;}
  body { background:inherit; }
`;

const withContainer = (Story, context) => (
  <DataContext.Provider value={contextData}>
    <style>
      {style}
      {storyStyle}
    </style>
    <Story {...context} />
  </DataContext.Provider>
);

export const decorators = [withContainer, StoryRouter()];
