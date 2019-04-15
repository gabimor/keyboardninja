import React, { Fragment, useContext } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import AppList from "../components/AppList"
import DataContext from "../DataContext"

const Home = () => {
  const { appCategories } = useContext(DataContext)

  return (
    <Container>
      <Hero>
        Every app, every shortcut, <b>the best ones first.</b>
      </Hero>
      <GridContainer>
        {appCategories.map(appCategory => (
          <AppList key={appCategory.shortName} {...appCategory} />
        ))}
      </GridContainer>
    </Container>
  )
}

export default Home

const Container = styled.div`
  max-width: 1022px;
  margin: 0 auto;
`

const GridContainer = styled.div`
  display: grid;
  grid-gap: 60px;
  grid-template-areas:
    "os browsers browsers"
    "coding coding coding"
    "casual casual casual"
    "graphics graphics graphics"
    "office office office";
  margin-top: 190px;

  @media (max-width: 992px) {
    grid-template-areas:
      "os"
      "browsers"
      "coding"
      "casual"
      "graphics"
      "office";
  }
`

const Hero = styled.h1`
  color: #ffffff;
  font-size: 50px;
  margin: 150px 0 25px 0;
  text-align: center;
  font-weight: 300;

  & b {
    font-weight: 500;
  }
`
