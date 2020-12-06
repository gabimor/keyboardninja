import React, { useContext } from "react";
import styled from "@emotion/styled";
import { DataContext } from "@client/DataContext";
import { LoginModalState } from "@client/store";

const VotePopover = () => {
  const store = useContext(DataContext);

  return (
    <Container>
      <Image src="/logo.svg" height="30" />
      <span>
        <a onClick={() => store.setLoginModalState(LoginModalState.Login)}>
          Login
        </a>{" "}
        or{" "}
        <a onClick={() => store.setLoginModalState(LoginModalState.Login)}>
          Signup
        </a>{" "}
        to save your favorite shortcuts by clicking the ninja star
      </span>
    </Container>
  );
};

export default VotePopover;

const Container = styled.div`
  background-color: #533a75;
  padding: 15px 10px;
  font-weight: 200;
  display: flex;
  align-items: center;
  border-radius: 7px;

  a {
    font-weight: 300;
  }
`;

const Image = styled.img`
  height: 30px;
  margin-right: 15px;
`;
