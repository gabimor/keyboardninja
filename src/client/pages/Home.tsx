import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";

import AppList from "./home/AppList";
import { DataContext } from "../DataContext";
import { desktopBreakpoint, tabletBreakpoint } from "@client/consts";
import { getTitle } from "@shared/utils";

const Home = () => {
  const { appCategories } = useContext(DataContext);

  useEffect(() => {
    document.title = getTitle("/");
  }, []);

  return (
    <Container>
      <Hero>
        Every app, every shortcut,
        <br /> the best ones first
        <HeroSub>
          Find your app's best keyboard shortcuts, see what everybody else is
          using
        </HeroSub>
      </Hero>
      <GridContainer>
        {appCategories.map((appCategory) => (
          <AppList key={appCategory.gridArea} {...appCategory} />
        ))}
      </GridContainer>
      <ContactCTA>
        Which app should I add next? <a href="/about">Let me know</a>
      </ContactCTA>
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

const HeroSub = styled.div`
  font-size: 22px;
  font-weight: 200;

  @media (max-width: ${tabletBreakpoint}px) {
    font-size: 16px;
    margin-top: 10px;
    line-height: 1.5em;
  }
`;

const Hero = styled.h1`
  color: #ffffff;
  font-size: 55px;
  text-align: center;
  margin: 120px 0 90px;
  font-weight: 500;
  line-height: 1.25em;

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

export const ContactCTA = styled.div`
  text-align: center;
  margin: 30px 0;
`;
