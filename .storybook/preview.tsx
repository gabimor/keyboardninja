import React from "react";
import { style } from "../src/server/web/pageTemplate/style";
import StoryRouter from "storybook-react-router";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "background",
    values: [
      {
        name: "background",
        value: "linear-gradient(#442323, #270505) no-repeat",
      },
      {
        name: "solid background",
        value: "#2c0909",
      },
      {
        name: "panel",
        value: "#2d2424",
      },
    ],
  },
};

const storyStyle = `
  html {background-color:inherit;}
  body { background:inherit; }
`;

const baseDecorator = (Story, context) => (
  <>
    <style>
      {style}
      {storyStyle}
    </style>
    <Story {...context} />
  </>
);

export const decorators = [baseDecorator, StoryRouter()];
