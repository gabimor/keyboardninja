import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import Logo from "./Logo";
import Nav from "./nav";
import { JwtUser } from "@src/types/User.type";

type Props = {
  user: JwtUser;
  onLogout?: () => void;
};

export default function Header({ user, onLogout }: Props) {
  return (
    <Container>
      <Link to="/">
        <Logo />
      </Link>
      <Nav user={user} onLogout={onLogout} />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: baseline;
  padding-top: 10px;

  @media (max-width: 992px) {
    padding-top: 0;
  }
`;
