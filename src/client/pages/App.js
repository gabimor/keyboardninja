import React from "react" // eslint-disable-line no-unused-vars
import { Component } from "react"

import styled from "@emotion/styled"

import ShortcutList from "./app/ShortcutList"
import Controls from "./app/Controls"

class App extends Component {
  static async getInitialProps({ query }) {
    const { id } = query
    const res = await fetch(`api/apps/${id}`)
    const app = await res.json()
    return { app }
  }

  render() {
    const { app } = this.props
    return (
      <div>
        <Controls icon={app.icon} name={app.name} />
        <ResultsContainer>
          {app.win.map(section => (
            <ShortcutList
              key={section.name}
              shortcuts={section.shortcuts}
              title={section.name}
            />
          ))}
        </ResultsContainer>
      </div>
    )
  }
}

export default App

const ResultsContainer = styled.div`
  columns: 2;
  column-gap: 30px;
`
