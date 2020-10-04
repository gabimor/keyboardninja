import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { JwtUser } from "@src/types/User.type";
import Avatar from "react-avatar";
import { AvatarMenu } from "./AvatarMenu";
import styled from "@emotion/styled";
import useOnClickOutside from "use-onclickoutside";
import MobileMenu from "./MobileMenu";
import { desktopBreakpoint } from "@client/consts";

export interface LoggedInProps {
  user?: JwtUser;
  onSettings: () => void;
  onLogout: () => void;
}

export default function LoggedInNav({
  user,
  onSettings,
  onLogout,
}: LoggedInProps) {
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => setAvatarMenuVisible(false));

  return (
    <>
      <DesktopNavContainer>
        <li>
          <Link to="/apps">My apps</Link>
        </li>
        <AvatarContainer ref={ref}>
          <StyledAvatar
            name={user.firstName + " " + user.lastName}
            facebookId={user.facebookId}
            googleId={user.googleId}
            size="36"
            onClick={() => setAvatarMenuVisible(true)}
            round={true}
            visible={avatarMenuVisible}
          />
          <AvatarMenu
            visible={avatarMenuVisible}
            user={user}
            onSettings={onSettings}
            onLogout={onLogout}
          />
        </AvatarContainer>
      </DesktopNavContainer>
      <MobileMenu />
    </>
  );
}

const DesktopNavContainer = styled.ul`
  @media (max-width: ${desktopBreakpoint}px) {
    display: none;
  }
`;

const AvatarContainer = styled.li`
  position: relative;
  user-select: none;
`;

type StyledAvatarProps = {
  visible: boolean;
};

const StyledAvatar = styled(Avatar)`
  position: relative;
  z-index: 1000;
  transition: all 0.2s ease-in-out;
  ${(props: StyledAvatarProps) => !props.visible && avatarHoverStyle};
`;

const avatarHoverStyle = `
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  }
`;
