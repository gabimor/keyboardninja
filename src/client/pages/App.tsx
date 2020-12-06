import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../DataContext";
import { observer } from "mobx-react-lite";

import styled from "@emotion/styled";

import Popover from "@client/components/Popover";
import ShortcutList from "./app/ShortcutList";
import Controls from "./app/Controls";
import { encodeAppName } from "../helpers";
import * as osSelect from "../helpers/osSelect";
import { getTitle } from "@shared/utils";
import { ContactCTA } from "./Home";

const App = () => {
  const { app, os } = useContext(DataContext);
  const [messageVisible, setMessageVisible] = useState(false);

  const handleClosePopover = () => {
    localStorage.setItem("signupCTAMessage", "true");
    setMessageVisible(false);
  };

  useEffect(() => {
    setMessageVisible(!localStorage.getItem("signupCTAMessage"));
    osSelect.init();

    document.title = getTitle("/:app", app.name);
  }, []);

  const encodedName = encodeAppName(app.name);
  return (
    <div>
      <Controls icon={encodedName + ".png"} name={app.name} />
      <ResultsContainer>
        {messageVisible && (
          <Popover onClose={handleClosePopover}>
            Click the ninja star to save your favorite shortcuts!
          </Popover>
        )}
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
      <ContactCTA>
        Which app should I add next? <a href="/about">Let me know</a>
      </ContactCTA>
    </div>
  );
};

export default observer(App);

// const Container = styled.div`
//   position: relative;
// `;

const ResultsContainer = styled.div`
  columns: 1;
  column-gap: 30px;
  position: relative;

  @media (max-width: 1122px) {
    columns: 1;
  }
`;
