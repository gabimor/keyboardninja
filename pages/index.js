import { Component } from "react"
import { connect } from "react-redux"

import styled from "styled-components"
import Router, { withRouter } from "next/router"

import { encodeAppName } from "../helpers"
import AppList from "../components/AppList"
import Layout from "./layout/Layout"
import { colors } from "./layout"
import { appUrlPrefix } from "../helpers"
import "isomorphic-unfetch"

class App extends Component {
  static async getInitialProps({ req }) {
    const res = await fetch("http://localhost:3000/api/app_categories")
    const appCategories = await res.json()
    return { appCategories }
  }

  // getAppName(selectedAppId) {
  //   if (!selectedAppId) return ""
  //   return this.props.apps.find(item => item.id === selectedAppId).name
  // }

  // handleSearch(selectedAppId) {
  //   const appName = this.getAppName(selectedAppId)
  //   Router.push(
  //     "/app?id=" + selectedAppId,
  //     appUrlPrefix + encodeAppName(appName)
  //   )
  // }

  render() {
    const { appCategories } = this.props
    return (
      <Layout>
        <Hero>
          Discover, save, share your <b>shortcuts</b>
        </Hero>
        {appCategories.map(category => (
          <AppList name={category.name} apps={category.apps} />
        ))}
      </Layout>
    )
  }
}

const Hero = styled.h1`
  color: ${colors.white};
  font-size: 40px;
  margin: 120px 0 165px 0;
  text-align: center;
  font-weight: 300;

  & b {
    font-weight: 500;
  }
`

function mapStateToProps({ apps }) {
  return { apps2: apps }
}

export default connect(mapStateToProps)(withRouter(App))
