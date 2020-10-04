import { DataContext } from "@client/DataContext";
import styled from "@emotion/styled";
import { JwtUser } from "@src/types/User.type";
import React, { useContext, useState } from "react";

export default function MobileMenu() {
  const [isVisible, setIsVisible] = useState(false);
  if (!isVisible) {
    return <Bars onClick={() => setIsVisible(true)} />;
  } else {
    return <Menu onClose={() => setIsVisible(false)} />;
  }
}

const Bars = (props: any) => (
  <div {...props}>
    <i className="fas fa-bars"></i>
  </div>
);

type MenuProps = { onClose: () => void };

const Menu = ({ onClose }: MenuProps) => {
  const { user, doLogout } = useContext(DataContext);

  return (
    <Container>
      <CloseButton onClick={onClose} className="fas fa-times"></CloseButton>
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
          <span onClick={doLogout}>
            <i className="fas fa-sign-out-alt"></i> Log out
          </span>
        </li>
      </ActionsContainer>
    </Container>
  );
};

const CloseButton = styled.i`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
`;

const Container = styled.div`
  position: fixed;
  top: 15px;
  left: 15px;
  padding: 15px;
  height: calc(100vh - 30px);
  width: calc(100vw - 30px);
  background: #424242;
`;

const ActionsContainer = styled.ul`
  border-top: solid 1px #606060;
  margin-top: 15px;
  padding-top: 10px;
  line-height: 2em;
  span i {
    padding-right: 7px;
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
