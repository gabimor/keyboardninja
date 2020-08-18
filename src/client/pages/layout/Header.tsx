import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { logout } from "../../helpers/api";
import DataContext from "../../DataContext";
import Logo from "./Logo";
import Nav from "./Nav";

function Header() {
  const { user, doLogout } = useContext(DataContext);

  function handleLogout() {
    logout();

    doLogout();
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
