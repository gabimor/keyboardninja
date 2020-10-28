import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import React, { LegacyRef, useContext, useRef, useState } from "react";
import Avatar from "react-avatar";
import { logout } from "@client/api/auth";
import CloseX from "@client/components/CloseX";
import { EmailLabel, NameLabel } from "./AvatarMenu";
import { Link } from "react-router-dom";
import useOnClickOutside from "use-onclickoutside";

export default function MobileMenu() {
  const popupRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useOnClickOutside(popupRef, () => setIsVisible(false));

  return (
    <>
      <Bars className="fas fa-bars" onClick={() => setIsVisible(true)} />
      {isVisible && <Menu onClose={() => setIsVisible(false)} ref={popupRef} />}
    </>
  );
}

type MenuProps = { onClose: () => void };

const Menu = React.forwardRef(
  ({ onClose }: MenuProps, ref: LegacyRef<HTMLDivElement>) => {
    const { user } = useContext(DataContext);

    return (
      <>
        <MenuContainer ref={ref}>
          <CloseX onClick={onClose} />
          <Avatar
            name={user.firstName + " " + user.lastName}
            facebookId={user.facebookId}
            googleId={user.googleId}
            size="50"
            round={true}
          />
          <NameLabel style={{ marginTop: 20, marginBottom: 5 }}>
            {user.firstName} {user.lastName}
          </NameLabel>
          <EmailLabel>{user.email}</EmailLabel>
          <ActionsContainer>
            <li>
              <Link to="/contact" onClick={onClose}>
                <i className="fas fa-users"></i>
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
  }
);

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
  font-size: 15px;
  left: 10px;
  padding: 35px 15px 15px 15px;
  width: calc(100vw - 20px);
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
  }
`;
