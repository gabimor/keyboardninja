import React, { useContext } from "react";
import styled from "@emotion/styled";
import { DataContext } from "@client/DataContext";
import { logout } from "@client/api/auth";

type Props = {
  isVisible: boolean;
};

export function AvatarMenu({ isVisible }: Props) {
  const { user } = useContext(DataContext);

  return (
    <Container className={isVisible && "visible"}>
      <DetailsContainer>
        <NameLabel>
          {user.firstName} {user.lastName}
        </NameLabel>
        <EmailLabel>{user.email}</EmailLabel>
      </DetailsContainer>
      <ActionsContainer>
        {/* <li>
          <span>
            <i className="fas fa-cog"></i> Settings
          </span>
        </li> */}
        <li>
          <span onClick={() => logout()}>
            <i className="fas fa-sign-out-alt"></i> Log out
          </span>
        </li>
      </ActionsContainer>
    </Container>
  );
}

const Container = styled.div`
  opacity: 0;
  visibility: hidden;
  right: -15px;
  top: -15px;
  z-index: 1000;
  position: absolute;
  background: #402022;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 17px 4px rgba(0, 0, 0, 0.26);
  white-space: nowrap;
  transition: all 0.1s ease-in-out;

  &.visible {
    visibility: visible;
    opacity: 1;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 60px 15px 0;
  color: #e9e5e5;
  border-bottom: solid 1px #453a3a;
  min-height: 50px;
`;

const ActionsContainer = styled.ul`
  padding-top: 10px;
  line-height: 2em;
  li {
    display: block;
    margin-left: 0;
  }

  span i {
    padding-right: 7px;
    color: #e9e5e5;
  }

  span:hover {
    cursor: pointer;
    color: #ccc;
  }
`;

export const NameLabel = styled.div`
  font-weight: 500;
  font-size: 14px;
  flex-grow: 1;
`;
export const EmailLabel = styled.div`
  margin-top: 3px;
  font-size: 13px;
  flex-grow: 1;
  color: #d1d0d4;
`;
