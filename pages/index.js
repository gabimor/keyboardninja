import { Component } from "react"
import { connect } from "react-redux"

import styled from "styled-components"
import Router, { withRouter } from "next/router"

import { encodeAppName } from "../helpers"
import AppList from "../components/AppList"
import SearchBar from "../components/SearchBar"
import Layout from "./layout/Layout"
import { colors } from "./layout"

const AppListContainer = styled.div`
  padding: 20px 30px;
  background: ${colors.panelGray};
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
        <SearchBar
          onChange={selectedAppId => this.handleSearch(selectedAppId)}
        />        
        <AppListContainer>
          <AppList
            name="Most searched apps"
            apps={mostSearchedApps}
            isOrdered={true}
          />
          <AppList
            name="Most pinned apps"
            apps={mostPinnedApps}
            isOrdered={true}
          />
          <AppList
            name="Apps with most shortcuts"
            apps={mostShortcutsApps}
            isOrdered={true}
          />
        </AppListContainer>
      </Layout>
    )
  }
}

function mapStateToProps(state) {  
  return { ...state }
}

export default connect(mapStateToProps)(withRouter(App))
