import React, { useContext } from "react";
import styled from "@emotion/styled";
import { DataContext } from "@client/DataContext";

type Props = {
  visible: boolean;
};

export function AvatarMenu({ visible }: Props) {
  const opacity = visible ? 1 : 0;
  const { user, doLogout } = useContext(DataContext);

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
          <span>
            <i className="fas fa-cog"></i> Settings
          </span>
        </li>
        <li>
          <span onClick={doLogout}>
            <i className="fas fa-sign-out-alt"></i> Log out
          </span>
        </li>
      </ActionsContainer>
    </Container>
  );
}

const DetailsContainer = styled.div`
  padding: 0 50px 15px 0;
  border-bottom: solid 1px #606060;
`;

const Container = styled.div`
  right: -15px;
  top: -15px;
  z-index: 1000;
  position: absolute;
  background: #383838;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 17px 4px rgba(0, 0, 0, 0.46);
  white-space: nowrap;
  transition: all 0.1s ease-in-out;
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
