import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import Avatar from "react-avatar";
import { logout } from "@client/api/auth";
import { EmailLabel, NameLabel } from "./AvatarMenu";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

export default function MobileMenu() {
  const { user } = useContext(DataContext);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <StyledAvatar
        name={user.firstName + " " + user.lastName}
        facebookId={user.facebookId}
        googleId={user.googleId}
        size="32"
        onClick={() => setIsVisible(!isVisible)}
        round={true}
      />
      <Menu isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </>
  );
}

type MenuProps = { isVisible: boolean; onClose: () => void };

const Menu = ({ onClose, isVisible }: MenuProps) => {
  const { user } = useContext(DataContext);

  return (
    <>
      <CSSTransition
        in={isVisible}
        timeout={400}
        classNames="slide-down"
        unmountOnExit
      >
        <MenuContainer>
          <NameLabel style={{ marginBottom: 5 }}>
            {user.firstName} {user.lastName}
          </NameLabel>
          <EmailLabel>{user.email}</EmailLabel>
          <ActionsContainer>
            <li>
              <Link to="/about" onClick={onClose}>
                <i className="fas fa-users"></i>
                About
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
      </CSSTransition>
      <CSSTransition
        in={isVisible}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <Overlay onClick={onClose} />
      </CSSTransition>
    </>
  );
};

const StyledAvatar = styled(Avatar)`
  position: relative;
  z-index: 1000;
`;

const MenuContainer = styled.div`
  user-select: none;
  position: fixed;
  color: red;
  z-index: 1000;
  top: 60px;
  font-size: 15px;
  right: 10px;
  padding: 20px;
  color: #e9e5e5;
  background: #261d1d;
  border-radius: 5px;
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
  margin-top: 20px;
  padding-top: 10px;
  line-height: 2em;
  text-align: left;
  i {
    width: 30px;
    color: #9d8b8b;
  }
`;
