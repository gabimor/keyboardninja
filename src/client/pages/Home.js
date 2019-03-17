import React, { Fragment } from "react"
import { Component } from "react"

import styled from "@emotion/styled"

import AppList from "../components/AppList"
import TestContext from "../TestContext"

class App extends Component {
  // state = {
  //   appCategories: [],
  // }

  // async componentDidMount() {
  //   const res = await fetch("api/app_categories")
  //   const appCategories = await res.json()
  //   this.setState({ appCategories })
  // }

  render() {
    // const { appCategories } = this.state
    return (
      <TestContext.Consumer>
        {appCategories => (        
          <Fragment>            
            <Hero>
              Discover, save, share your <b>shortcuts</b>
            </Hero>
            {/* {appCategories.map(category => (
              <AppList
                key={category.name}
                name={category.name}
                apps={category.apps}
              />
            ))} */}
          </Fragment>
        )}
      </TestContext.Consumer>
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

export default App
