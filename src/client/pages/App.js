import React, { useContext } from "react" // eslint-disable-line no-unused-vars
import DataContext from "../DataContext"

import styled from "@emotion/styled"

import ShortcutList from "./app/ShortcutList"
import Controls from "./app/Controls"

const App = () => {
  const { app } = useContext(DataContext)

  const sections = createSections(app)
  return (
    <div>
      <Controls icon={app.icon} name={app.name} />
      <ResultsContainer>
        {sections.map(section => (
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

export function createSections({ id, sections, shortcuts }) {
  const result = []

  for (const section of sections.filter(e => e.appId === id)) {
    result.push({
      id: section.id,
      order: section.order,
      name: section.name,
      shortcuts: shortcuts.filter(e => e.sectionId === section.id),
    })
  }
  return result
}

export default App

const ResultsContainer = styled.div`
  columns: 2;
  column-gap: 30px;
`
