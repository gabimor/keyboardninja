import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import Button from "./Button";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <>
      <Button>Primary</Button> &nbsp;
      <Button secondary={true}>Secondary</Button>
    </>
  ));
