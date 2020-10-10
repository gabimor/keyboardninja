import React, { useContext } from "react";
import styled from "@emotion/styled";

import AppList from "./home/AppList";
import { DataContext } from "../DataContext";
import { desktopBreakpoint, tabletBreakpoint } from "@client/consts";

const Home = () => {
  const { appCategories } = useContext(DataContext);

  return (
    <Container>
      <Hero>
        Save. Vote, discover the best shortcuts<b> </b>
      </Hero>
      <GridContainer>
        {appCategories.map((appCategory) => (
          <AppList key={appCategory.gridArea} {...appCategory} />
        ))}
      </GridContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-gap: 60px;
  grid-template-areas:
    "os browsers browsers"
    "coding coding coding"
    "casual casual casual"
    "graphics graphics graphics"
    "office office office";

  @media (max-width: ${desktopBreakpoint}px) {
    grid-template-areas:
      "os"
      "browsers"
      "coding"
      "casual"
      "graphics"
      "office";
  }
`;

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

  @media (max-width: ${desktopBreakpoint}px) {
    margin-top: 75px;
    margin-bottom: 110px;
    font-size: 40px;
  }

  @media (max-width: ${tabletBreakpoint}px) {
    margin-top: 50px;
    margin-bottom: 70px;
    font-size: 30px;
  }
`;
