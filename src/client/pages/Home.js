import React, { useContext } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import AppList from "./app/AppList"
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
          <AppList key={appCategory.gridArea} {...appCategory} />
        ))}
      </GridContainer>
    </Container>
  )
}

export default Home

const Container = styled.div`
  max-width: 1024px;
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
  margin-top: 150px;
  margin-bottom: 190px;
  text-align: center;
  font-weight: 300;
  line-height: 1.5em;

  & b {
    font-weight: 500;
  }

  @media (max-width: 992px) {
    margin-top: 75px;
    margin-bottom: 110px;
    font-size: 40px;
  }

  @media (max-width: 768px) {
    margin-top: 50px;
    margin-bottom: 70px;
    font-size: 30px;
  }
`
