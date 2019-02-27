import { Component } from "react"

import styled from "styled-components"
import Router, { withRouter } from "next/router"

import AppList from "../components/AppList"
import Layout from "./layout/Layout"
import "isomorphic-unfetch"

class App extends Component {
  static async getInitialProps({ req }) {
    const res = await fetch("http://localhost:3000/api/app_categories")
    const appCategories = await res.json()
    return { appCategories }
  }

  render() {
    const { appCategories } = this.props
    return (
      <Layout>
        <Hero>
          Discover, save, share your <b>shortcuts</b>
        </Hero>
        {appCategories.map(category => (
          <AppList
            key={category.name}
            name={category.name}
            apps={category.apps}
          />
        ))}
      </Layout>
    )
  }
}

const Hero = styled.h1`
  color: #ffffff;
  font-size: 40px;
  margin: 120px 0 165px 0;
  text-align: center;
  font-weight: 300;

  & b {
    font-weight: 500;
  }
`

export default withRouter(App)
