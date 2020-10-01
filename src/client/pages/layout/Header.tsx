import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import Logo from "./Logo";
import Nav from "./Nav";
import { DataContext } from "@client/DataContext";
import { logout } from "@client/api/auth";

function Header() {
  const { user } = useContext(DataContext);

  return (
    <Container>
      <Link to="/">
        <Logo />
      </Link>
      <Nav user={user} onLogout={logout} />
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
