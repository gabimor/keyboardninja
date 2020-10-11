import React, { useContext, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

import { DataContext } from "@client/DataContext";
import OSSelect from "./OSSelect";
import { desktopBreakpoint, tabletBreakpoint } from "@client/consts";
import { intermediateColor } from "@client/helpers/colors";
import {
  backgroundGradientStartColor,
  backgroundGradientEndColor,
} from "@server/misc/pageTemplate/style";

interface Props {
  icon: string;
  name: string;
}

const changeEndY = 430;

function Controls({ icon, name }: Props) {
  const store = useContext(DataContext);
  const containerRef = useRef(null);

  const setBackground = () => {
    const containerTop = containerRef?.current?.offsetTop || 0;

    const percentTransitioned = Math.min(containerTop / changeEndY, 1);
    const bgColor = intermediateColor(
      backgroundGradientStartColor,
      backgroundGradientEndColor,
      percentTransitioned
    );

    document?.documentElement.style.setProperty("--controls-bg", bgColor);
  };

  useEffect(setBackground, []);

  useEffect(() => {
    window.addEventListener("scroll", setBackground);
    window.addEventListener("resize", setBackground);

    return () => {
      window.removeEventListener("scroll", setBackground);
      window.removeEventListener("resize", setBackground);
    };
  });

  return (
    <Container ref={containerRef}>
      <NameWrapper>
        <Icon src={"/logos/" + icon} />
        <Name>{name}</Name>
      </NameWrapper>
      <SearchWrapper />
      <OSSelect
        onSelect={(os) => {
          store.setOs(os);
        }}
        os={store.os}
        oss={store.app.oss}
      />
      {/* <Seperator />
      <Share /> */}
    </Container>
  );
}

export default observer(Controls);

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 3px;
  margin: 60px 0 40px 0;
  border-bottom: solid 1px #5a5a5a;
  position: sticky;
  top: 0;
  background: var(--controls-bg);

  @media (max-width: ${tabletBreakpoint}px) {
    margin: 30px 0 20px 0;
  }
`;

// const Seperator = styled.div`
//   height: 39px;
//   border-left: solid 1px #5a5a5a;
//   margin: 0 20px;
// `;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${tabletBreakpoint}px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  transition: all 0.5s;

  @media (max-width: ${desktopBreakpoint}px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: ${tabletBreakpoint}px) {
    width: 25px;
    height: 25px;
    margin-bottom: 4px;
  }
`;

const Name = styled.h1`
  font-size: 40px;
  margin-left: 20px;
  font-weight: 200;
  line-height: normal;

  transition: all 0.5s;

  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 25px;
  }

  @media (max-width: ${tabletBreakpoint}px) {
    font-size: 12px;
    margin-left: 0;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-right: 20px;
  margin-left: auto;
`;
