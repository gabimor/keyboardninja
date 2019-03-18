import React, { Fragment } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import AppList from "../components/AppList"
import DataContext from "../DataContext"

const App = () => (
  <DataContext.Consumer>
    {appCategories => (
      <Fragment>
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
      </Fragment>
    )}
  </DataContext.Consumer>
)

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
