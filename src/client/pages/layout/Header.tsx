import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import Logo from "./Logo";
import Nav from "./nav";
import { desktopBreakpoint } from "@client/consts";

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <Logo />
      </Link>
      <Nav />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: baseline;
  padding-top: 20px;

  @media (max-width: ${desktopBreakpoint}px) {
    padding-top: 0;
  }
`;
