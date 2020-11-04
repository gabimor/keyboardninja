import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import React, { LegacyRef, useContext, useState } from "react";
import Avatar from "react-avatar";
import { logout } from "@client/api/auth";
import { EmailLabel, NameLabel } from "./AvatarMenu";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useContext(DataContext);

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

      {isVisible && <Menu onClose={() => setIsVisible(false)} />}
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
          <NameLabel style={{ marginBottom: 5 }}>
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
        <Overlay onClick={onClose} />
      </>
    );
  }
);

const StyledAvatar = styled(Avatar)`
  position: relative;
  z-index: 1000;
`;

const MenuContainer = styled.div`
  user-select: none;
  position: fixed;
  color: red;
  z-index: 1000;
  top: 50px;
  font-size: 15px;
  right: 10px;
  padding: 25px;
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
