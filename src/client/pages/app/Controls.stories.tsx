import React from "react";

import { storiesOf } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";

import Controls from "./Controls";

storiesOf("Controls", module)
  .addDecorator(withKnobs)
  .add("default", () => (
    <Controls
      name={text("name", "Visual Studio Code")}
      icon="visual-studio-code.png"
    />
  ));
