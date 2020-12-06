import React, { useContext, useEffect } from "react";
import { DataContext } from "../DataContext";
import { observer } from "mobx-react-lite";

import styled from "@emotion/styled";

import SignupBannerMessage from "./app/SignupBannerMessage";
import ShortcutList from "./app/ShortcutList";
import Controls from "./app/Controls";
import { encodeAppName } from "../helpers";
import * as osSelect from "../helpers/osSelect";
import { getTitle } from "@shared/utils";
import { ContactCTA } from "./Home";
import { tabletBreakpoint } from "@client/consts";

const App = () => {
  const { app, os, user } = useContext(DataContext);

  useEffect(() => {
    osSelect.init();

    document.title = getTitle("/:app", app.name);
  }, []);

  const encodedName = encodeAppName(app.name);
  return (
    <div>
      <Controls icon={encodedName + ".png"} name={app.name} />
      {!user && <SignupBannerMessage />}
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
      <ContactCTA>
        Which app should I add next? <a href="/about">Let me know</a>
      </ContactCTA>
    </div>
  );
};

export default observer(App);

const ResultsContainer = styled.div`
  columns: 1;
  column-gap: 30px;
  position: relative;

  @media (max-width: 1122px) {
    columns: 1;
  }

  margin-top: 10px;

  @media (min-width: ${tabletBreakpoint}px) {
    margin-top: 20px;
  }
`;
