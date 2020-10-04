import React from "react";
import styled from "@emotion/styled";
import { JwtUser } from "@src/types/User.type";

type Props = {
  visible: boolean;
  user: JwtUser;
  onSettings: () => void;
  onLogout: () => void;
};

export function AvatarMenu({ visible, user, onSettings, onLogout }: Props) {
  const opacity = visible ? 1 : 0;

  return (
    <Container style={{ opacity }}>
      <DetailsContainer>
        <Name>
          {user.firstName} {user.lastName}
        </Name>
        <Email>{user.email}</Email>
      </DetailsContainer>
      <ActionsContainer>
        <li>
          <span onClick={onSettings}>
            <i className="fas fa-cog"></i> Settings
          </span>
        </li>
        <li>
          <span onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i> Log out
          </span>
        </li>
      </ActionsContainer>
    </Container>
  );
}

const DetailsContainer = styled.div`
  padding-right: 50px;
`;

const Container = styled.div`
  right: -15px;
  top: -15px;
  position: absolute;
  background: #424242;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 17px 1px rgba(0, 0, 0, 0.36);
  white-space: nowrap;
  transition: all 0.1s ease-in-out;
`;

const ActionsContainer = styled.ul`
  border-top: solid 1px #606060;
  margin-top: 15px;
  padding-top: 10px;
  line-height: 2em;
  span i {
    padding-right: 7px;
  }

  span:hover {
    cursor: pointer;
    color: #ccc;
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
`;
const Email = styled.div`
  margin-top: 3px;
  font-size: 13px;
`;
