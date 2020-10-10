import React from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

import { encodeAppName } from "../../helpers";
import AppItem, { AppItemProps } from "./AppItem";
import { desktopBreakpoint, tabletBreakpoint } from "@client/consts";

export interface AppListProps {
  name: string;
  apps: AppItemProps[];
  gridArea?: string;
}

function AppList({ name, apps, gridArea }: AppListProps) {
  return (
    <Container gridArea={gridArea}>
      <Header>{name}</Header>
      <InnerContainer className={gridArea}>
        {apps.map((app) => {
          const encodedName = encodeAppName(app.name);
          const CurrItem = () => (
            <AppItem
              icon={"/logos/" + app.icon}
              name={app.name}
              disabled={app.disabled}
            />
          );

          return app.disabled ? (
            <CurrItem key={app.name} />
          ) : (
            <a href={"/" + encodedName} key={app.name}>
              <CurrItem />
            </a>
          );
        })}
      </InnerContainer>
    </Container>
  );
}
export default observer(AppList);

interface ContainerProps {
  gridArea: string;
}

const Container = styled.div`
  background: #2c2525;
  grid-area: ${(props: ContainerProps) => props.gridArea};
  padding: 20px;
  border-radius: 7px;
  border: 1px solid #403535;

  @media (max-width: ${desktopBreakpoint}px) {
    padding: 15px 10px;
  }

  @media (max-width: ${tabletBreakpoint - 1}px) {
    padding: 10px 6px;
  }
`;

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  --appItemSize: 132px;

  @media (max-width: 1124px) {
    --appItemSize: 122px;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    --appItemSize: 136px;
  }

  @media (max-width: 992px) {
    --appItemSize: 145px;
  }

  @media (max-width: 880px) {
    grid-template-columns: repeat(5, 1fr);
    --appItemSize: 150px;
  }

  @media (max-width: 768px) {
    --appItemSize: 137px;
  }

  @media (max-width: 650px) {
    --appItemSize: 120px;
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(4, 1fr);
    --appItemSize: 110px;
  }

  @media (max-width: 414px) {
    grid-template-columns: repeat(3, 1fr);
    --appItemSize: 119px;
  }

  @media (max-width: 375px) {
    --appItemSize: 106px;
  }
`;

const Header = styled.h2`
  color: #e9e5e5;
  font-weight: 300;
  font-size: 16px;
  margin-bottom: 15px;
  margin-left: 5px;
`;
