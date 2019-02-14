import { Component } from "react"
import { connect } from "react-redux"

import styled from "styled-components"
import Router, { withRouter } from "next/router"

import { encodeAppName } from "../helpers"
import AppList from "../components/AppList"
import Layout from "./layout/Layout"
import { colors } from "./layout"
import { appUrlPrefix } from "../helpers"

class App extends Component {
  getAppName(selectedAppId) {
    if (!selectedAppId) return ""
    return this.props.apps.find(item => item.id === selectedAppId).name
  }

  handleSearch(selectedAppId) {
    const appName = this.getAppName(selectedAppId)
    Router.push(
      "/searchResults?appId=" + selectedAppId,
      appUrlPrefix + encodeAppName(appName)
    )
  }

  getAppsByCategory() {
    // const appsByCategory = apps.reduce((acc, currApp) => {
    //   const categoryName = appCategories.find(
    //     item => item.id === currApp.categoryId
    //   ).name
    //   acc[categoryName] = acc[categoryName] || []
    //   acc[categoryName].push(currApp)
    //   return acc
    // }, {})
  }

  render() {
    const { mostSearchedApps, mostPinnedApps, mostShortcutsApps } = this.props
    return (
      <Layout>
        <Hero>Every app's shortcuts</Hero>
        <HeroSub>ordered by popularity</HeroSub>
      </Layout>
    )
  }
}

const AppListContainer = styled.div`
  padding: 20px 30px;
  background: ${colors.panelGray};
  display: grid;
  grid-gap: 30px 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

const Hero = styled.h1`
  color: ${colors.white};
  font-size: 40px;
  margin:50px 0 10px 0;
  text-align:center;
  font-weight:bold;
`

const HeroSub = styled.h2`
  color: ${colors.white};
  font-size: 30px;
  text-align:center;
  font-weight:300;
`

function mapStateToProps(state) {
  return { ...state }
}

export default connect(mapStateToProps)(withRouter(App))
