import React, { Fragment, useContext } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"
import { Link } from "react-scroll"

import AppList from "../components/AppList"
import DataContext from "../DataContext"

const Home = () => {
  const { appCategories } = useContext(DataContext)

  return (
    <Container>
      <Hero>
        Discover, save, share your <b>shortcuts</b>
      </Hero>
      <Index>
        {appCategories.map(appCategory => (
          <Link
            key={appCategory.shortName}
            to={appCategory.shortName}
            smooth={true}
            offset={-20}
          >
            {appCategory.name}
          </Link>
        ))}
      </Index>
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
    "coding coding coding"
    "os browsers browsers"
    "casual casual casual"
    "graphics graphics graphics"
    "office office office";

  @media (max-width: 992px) {
    grid-template-areas:
      "coding"
      "os"
      "browsers"
      "casual"
      "graphics"
      "office";
  }
`

const Index = styled.h3`
  display: flex;
  margin-bottom: 50px;

  color: #ffffff;
  text-align: center;

  a {
    flex-grow: 1;
  }
`

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
