import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import Logo from "./Logo";
import Nav from "./nav";
import { JwtUser } from "@src/types/User.type";
import { desktopBreakpoint } from "@client/consts";

type Props = {
  user: JwtUser;
  onSettings?: () => void;
  onLogout?: () => void;
};

export default function Header({ user, onSettings, onLogout }: Props) {
  return (
    <Container>
      <Link to="/">
        <Logo />
      </Link>
      <Nav user={user} onLogout={onLogout} onSettings={onSettings} />
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: baseline;
  padding-top: 10px;

  @media (max-width: ${desktopBreakpoint}px) {
    padding-top: 0;
  }
`;
