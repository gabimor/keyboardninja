import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataContext";

import styled from "@emotion/styled";

import FirstTimeMessage from "./app/FirstTimeMessage";
import ShortcutList from "./app/ShortcutList";
import Controls from "./app/Controls";
import { encodeAppName } from "../helpers";
import * as osSelect from "../helpers/osSelect";

const App = () => {
  const { app, os } = useContext(DataContext);
  const [messageVisible, setMessageVisible] = useState(false);

  const handleDismiss = () => {
    localStorage.setItem("firstTimeMessage", "true");
    setMessageVisible(false);
  };

  useEffect(() => {
    setMessageVisible(!localStorage.getItem("firstTimeMessage"));
    osSelect.init();
  }, []);

  const encodedName = encodeAppName(app.name);
  return (
    <div>
      <Controls icon={encodedName + ".png"} name={app.name} />
      {messageVisible && <FirstTimeMessage onDismiss={handleDismiss} />}
      <ResultsContainer>
        {app.sections.map((section) => {
          const shortcuts = app.shortcuts.filter(
            (e) => e.sectionId.toString() === section._id.toString() && e[os]
          );

          if (shortcuts.length === 0) return undefined;

          return (
            <ShortcutList
              key={section._id}
              shortcuts={shortcuts}
              title={section.name}
            />
          );
        })}
      </ResultsContainer>
    </div>
  );
};

export default App;

const ResultsContainer = styled.div`
  columns: 2;
  column-gap: 30px;

  @media (max-width: 1122px) {
    columns: 1;
  }
`;
