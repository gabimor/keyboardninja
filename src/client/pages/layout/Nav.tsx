import React from "react";

import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

function Anonymous() {
  return (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
      <li>
        <Button to="/contact">Wanna Help?</Button>
      </li>
    </>
  );
}

interface LoggedInProps {
  user;
  onLogout: Function;
}

function LoggedIn({ user, onLogout }) {
  return (
    <>
      <li>{user.email}</li>
      <li>
        <Link to="/apps">My apps</Link>
      </li>
      <li>
        <a onClick={onLogout}>Logout</a>
      </li>
    </>
  );
}

export default (props) => (
  <Container>{props.user ? <LoggedIn {...props} /> : <Anonymous />}</Container>
);

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
