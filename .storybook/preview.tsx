import React from "react";
import { style } from "../src/server/pageTemplate/style";
import StoryRouter from "storybook-react-router";

const backgrounds = {
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
};

const viewports = {
  mobile1: {
    name: "Small mobile",
    styles: {
      height: "568px",
      width: "360px",
    },
    type: "mobile",
  },
  mobile2: {
    name: "Large mobile",
    styles: {
      height: "896px",
      width: "414px",
    },
    type: "mobile",
  },
  tablet: {
    name: "Tablet",
    styles: {
      height: "1112px",
      width: "834px",
    },
    type: "tablet",
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports,
  },
  backgrounds,
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
