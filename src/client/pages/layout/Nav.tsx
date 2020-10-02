import React from "react";

import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../../components/Buttons";
import { JwtUser } from "@src/types/User.type";
import Avatar from "react-avatar";

export default (props: LoggedInProps) => (
  <Container>{props.user ? <LoggedIn {...props} /> : <Anonymous />}</Container>
);

function Anonymous() {
  return (
    <>
      <li>
        <Link to="/contact">Wanna Help?</Link>
      </li>
      <li>
        <Link to="/login">Log in</Link>
      </li>
      <li>
        <Link to="/signup">
          <PrimaryButton>Sign up</PrimaryButton>
        </Link>
      </li>
    </>
  );
}

interface LoggedInProps {
  user?: JwtUser;
  onLogout?: () => void;
}

function LoggedIn({ user, onLogout }: LoggedInProps) {
  return (
    <>
      <li>{user.email}</li>
      <li>
        <Link to="/apps">My apps</Link>
      </li>
      <li>
        <a onClick={onLogout}>Logout</a>
      </li>
      <li>
        <Avatar
          name={user.firstName + " " + user.lastName}
          facebookId={user.facebookId}
          googleId={user.googleId}
          size="36"
          round={true}
        />
      </li>
    </>
  );
}

const Container = styled.ul`
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  list-style: none;
  margin-left: auto;

  li {
    padding-left: 20px;
    display: inline-block;
  }

  a {
    color: #ffffff;
  }
`;
