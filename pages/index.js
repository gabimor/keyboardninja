import { Component } from "react"
import { connect } from "react-redux"

import styled from "styled-components"
import Router, { withRouter } from "next/router"

import { encodeAppName } from "../helpers"
import TopApps from "./home/TopApps"
import SearchBar from "../components/SearchBar"
import Layout from "./layout/Layout"


const TopAppsContainer = styled.div`
  display: grid;
  grid-gap: 30px 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

class App extends Component {
  getAppName(selectedAppId) {
    if (!selectedAppId) return ""
    return this.props.apps.find(item => item.id === selectedAppId).name
  }

  handleSearch(selectedAppId) {
    const appName = this.getAppName(selectedAppId)
    Router.push(
      "/searchResults?appId=" + selectedAppId,
      "/apps/" + encodeAppName(appName)
    )
  }

  render() {
    const { mostSearchedApps, mostPinnedApps, mostShortcutsApps } = this.props

    return (
      <Layout>
        <SearchBar onChange={selectedAppId => this.handleSearch(selectedAppId)} />
        <TopAppsContainer>
          <TopApps name="Most Searched Apps" apps={mostSearchedApps} />
          <TopApps name="Most Pinned Apps" apps={mostPinnedApps} />
          <TopApps name="Apps With Most Shortcuts" apps={mostShortcutsApps} />
        </TopAppsContainer>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return { ...state }
}

export default connect(mapStateToProps)(withRouter(App))
