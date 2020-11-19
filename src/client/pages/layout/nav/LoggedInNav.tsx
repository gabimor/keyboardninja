import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { AvatarMenu } from "./AvatarMenu";
import styled from "@emotion/styled";
import useOnClickOutside from "use-onclickoutside";
import MobileMenu from "./MobileMenu";
import { enterMobileBreakpoint } from "@client/consts";
import { useMediaQuery } from "react-responsive";
import { DataContext } from "@client/DataContext";

export default function LoggedInNav() {
  const isMobile = useMediaQuery({ maxWidth: enterMobileBreakpoint });
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const { user } = useContext(DataContext);
  const ref = React.useRef(null);
  useOnClickOutside(ref, () => setAvatarMenuVisible(false));

  return (
    <>
      {isMobile ? (
        <MobileMenu />
      ) : (
        <DesktopNavContainer>
          <li>
            <Link to="/contact">Add an App</Link>
          </li>
          <AvatarContainer ref={ref}>
            <StyledAvatar
              name={user.firstName + " " + user.lastName}
              facebookId={user.facebookId}
              googleId={user.googleId}
              size="40"
              onClick={() => setAvatarMenuVisible(true)}
              round={true}
              visible={avatarMenuVisible}
            />
            <AvatarMenu isVisible={avatarMenuVisible} />
          </AvatarContainer>
        </DesktopNavContainer>
      )}
    </>
  );
}

const DesktopNavContainer = styled.ul`
  @media (max-width: ${enterMobileBreakpoint}px) {
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
  z-index: 1001;
  transition: all 0.2s ease-in-out;
  ${(props: StyledAvatarProps) => !props.visible && avatarHoverStyle};
`;

const avatarHoverStyle = `
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  }
`;
