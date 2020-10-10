import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import Avatar from "react-avatar";
import { logout } from "@client/api/auth";

export default function MobileMenu() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Bars className="fas fa-bars" onClick={() => setIsVisible(true)} />
      {isVisible && <Menu onClose={() => setIsVisible(false)} />}
    </>
  );
}

type MenuProps = { onClose: () => void };

const Menu = ({ onClose }: MenuProps) => {
  const { user } = useContext(DataContext);

  return (
    <>
      <MenuContainer>
        <CloseButton onClick={onClose} className="fas fa-times"></CloseButton>
        <Avatar
          name={user.firstName + " " + user.lastName}
          facebookId={user.facebookId}
          googleId={user.googleId}
          size="50"
          round={true}
        />
        <Name>
          {user.firstName} {user.lastName}
        </Name>
        <Email>{user.email}</Email>
        <ActionsContainer>
          <li>
            <span>
              <i className="fas fa-cog"></i> Settings
            </span>
          </li>
          <li>
            <span onClick={() => logout()}>
              <i className="fas fa-sign-out-alt"></i> Log out
            </span>
          </li>
        </ActionsContainer>
      </MenuContainer>
      <Overlay />
    </>
  );
};

const Bars = styled.i`
  font-size: 20px;
`;

const MenuContainer = styled.div`
  user-select: none;
  text-align: center;
  position: fixed;
  z-index: 1000;
  top: 10px;
  left: 10px;
  padding: 35px 15px 15px 15px;
  width: calc(100vw - 20px);
  background: #261d1d;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 100;
  content: "";
  display: block;
  height: 100%;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.i`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
`;

const ActionsContainer = styled.ul`
  border-top: solid 1px #606060;
  margin-top: 15px;
  padding-top: 10px;
  line-height: 2em;
  text-align: left;
  span i {
    padding-right: 7px;
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  padding-top: 15px;
`;
const Email = styled.div`
  margin-top: 3px;
  font-size: 13px;
`;
