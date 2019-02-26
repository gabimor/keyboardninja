import { Component } from "react"

import styled from "styled-components"
import Router, { withRouter } from "next/router"

import ShortcutList from "./app/ShortcutList"
import Controls from "./app/Controls"
import Layout from "./layout/Layout"

class App extends Component {
  static async getInitialProps({ query }) {
    const { id } = query
    const res = await fetch(`http://localhost:3000/api/apps/${id}`)
    const app = await res.json()
    return { app }
  }

  render() {
    const { app } = this.props
    return (
      <Layout>
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
      </Layout>
    )
  }
}

export default withRouter(App)

const ResultsContainer = styled.div`
  columns: 2;
  column-gap: 30px;
`
