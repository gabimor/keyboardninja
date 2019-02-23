import { Component } from "react"

import styled from "styled-components"
import Router, { withRouter } from "next/router"

import ShortcutList from "./app/ShortcutList"
import Layout from "./layout/Layout"

class App extends Component {
  static async getInitialProps({ query }) {
    const { id } = query
    const res = await fetch(`http://localhost:3000/api/apps/${id}`)
    const app = await res.json()
    return { app }
  }

  reduceShortcuts(selectedAppId, shortcuts) {
    if (!selectedAppId) return {}

    const appShortcuts = shortcuts.filter(item => item.appId === selectedAppId)

    return appShortcuts.reduce((acc, curr) => {
      if (!acc[curr.appSectionId]) acc[curr.appSectionId] = []
      acc[curr.appSectionId].push(curr)

      return acc
    }, {})
  }

  renderShortcutCategory(sectionId) {
    const sectionTitle = this.props.appSections.find(
      item => item.id === sectionId
    ).name
    const { shownShortcuts } = this.state

    return (
      <ShortcutList
        key={sectionId}
        shortcuts={shownShortcuts[sectionId]}
        title={sectionTitle}
      />
    )
  }

  render() {
    const { app } = this.props

    return (
      <Layout>
        <ResultsContainer>
          <ShortcutList
            
            shortcuts={app.win["Test"]}
            title={"Test"}
          />

          {/* {Object.keys(app.win).map(sectionName => (
            <ShortcutList
              key={sectionName}
              shortcuts={app.win[sectionName]}
              title={sectionName}
            />
          ))} */}
        </ResultsContainer>
      </Layout>
    )
  }
}

export default withRouter(App)

const ResultsContainer = styled.div`
  display: grid;
  grid-gap: 30px 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`
