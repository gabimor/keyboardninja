import React, { useState, useEffect } from "react" // eslint-disable-line no-unused-vars

import styled from "@emotion/styled"

import ShortcutList from "./app/ShortcutList"
import Controls from "./app/Controls"

const App = () => {
  const [app, setApp] = useState({ name: "clienttts", icon: "asdsa", win: [] })

  useEffect(() => {
    fetch("/api/apps/visual-studio")
      .then(res => res.json())
      .then(json => {
        setApp(json)
      })
  }, [])

  return (
    <div>
      <Controls icon={app.icon} name={app.name} />
      <ResultsContainer>
        {app.win.map(section => (
          <ShortcutList
            key={section.id}
            shortcuts={section.shortcuts}
            title={section.name}
          />
        ))}
      </ResultsContainer>
    </div>
  )
}

export default App

const ResultsContainer = styled.div`
  columns: 2;
  column-gap: 30px;
`
