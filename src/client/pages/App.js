import React, { useState, useEffect, useContext } from "react" // eslint-disable-line no-unused-vars
import DataContext from "../DataContext"

import styled from "@emotion/styled"

import ShortcutList from "./app/ShortcutList"
import Controls from "./app/Controls"

const App = ({ match }) => {
  const contextData = useContext(DataContext)
  const [app, setApp] = useState({
    name: contextData.app.name,
    icon: contextData.app.icon,
    win: [],
  })
  const [, setUserApp] = useState()

  useEffect(() => {
    fetch("/api/apps/" + match.params.name)
      .then(res => res.json())
      .then(json => {
        setApp(json.app)
        setUserApp(json.userApp)
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
