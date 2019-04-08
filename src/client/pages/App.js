import React, { useContext } from "react" // eslint-disable-line no-unused-vars
import DataContext from "../DataContext"

import styled from "@emotion/styled"

import ShortcutList from "./app/ShortcutList"
import Controls from "./app/Controls"

const App = () => {
  const { app, os } = useContext(DataContext)

  return (
    <div>
      <Controls icon={app.icon} name={app.name} />
      <ResultsContainer>
        {app.sections.map(section => {
          const shortcuts = app.shortcuts.filter(
            e => e.sectionId.toString() === section._id.toString() && e[os]
          )

          if (shortcuts.length === 0) return undefined

          return (
            <ShortcutList
              key={section._id}
              shortcuts={shortcuts}
              title={section.name}
            />
          )
        })}
      </ResultsContainer>
    </div>
  )
}

export default App

const ResultsContainer = styled.div`
  columns: 2;
  column-gap: 30px;
`
