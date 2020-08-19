import React from "react";

import { storiesOf } from "@storybook/react";

import FirstTimeMessage from "./FirstTimeMessage";

storiesOf("FirstTimeMessage", module).add("default", () => (
  <FirstTimeMessage
    onDismiss={() => {
      alert();
    }}
  />
));
