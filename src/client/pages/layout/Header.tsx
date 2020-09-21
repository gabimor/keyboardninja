import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { logout } from "@client/api/auth";
import Logo from "./Logo";
import Nav from "./Nav";

function Header() {
  function handleLogout() {
    logout();
  }

  return (
    <Container>
      <Link to="/">
        <Logo />
      </Link>
      <Nav />
    </Container>
  );
}

export default Header;

const Container = styled.header`
  display: flex;
  align-items: baseline;
  padding-top: 10px;

  @media (max-width: 992px) {
    padding-top: 0;
  }
`;
