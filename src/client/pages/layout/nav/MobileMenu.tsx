import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import Avatar from "react-avatar";
import { logout } from "@client/api/auth";
import CloseX from "@client/components/CloseX";
import { EmailLabel, NameLabel } from "./AvatarMenu";
import { Link } from "react-router-dom";

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
        <CloseX onClick={onClose} className="fas fa-times"></CloseX>
        <Avatar
          name={user.firstName + " " + user.lastName}
          facebookId={user.facebookId}
          googleId={user.googleId}
          size="50"
          round={true}
        />
        <NameLabel style={{ marginTop: 10 }}>
          {user.firstName} {user.lastName}
        </NameLabel>
        <EmailLabel>{user.email}</EmailLabel>
        <ActionsContainer>
          <li>
            <Link to="/contact" onClick={onClose}>
              <i className="fas fa-question"></i>
              Wanna Help ?
            </Link>
          </li>
          {/* <li>
            <span>
              <i className="fas fa-cog"></i> Settings
            </span>
          </li> */}
          <li>
            <span onClick={() => logout()}>
              <i className="fas fa-sign-out-alt"></i>Log out
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
  color: red;
  z-index: 1000;
  top: 10px;
  left: 10px;
  padding: 35px 15px 15px 15px;
  width: calc(100vw - 20px);
  color: #e9e5e5;
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
  background-color: rgba(0, 0, 0, 0.65);
`;

const ActionsContainer = styled.ul`
  border-top: solid 1px #453a3a;
  margin-top: 15px;
  padding-top: 10px;
  line-height: 2em;
  text-align: left;
  i {
    width: 20px;
  }
`;
