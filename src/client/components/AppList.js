import React from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import { encodeAppName } from "../helpers"
import AppItem from "./AppItem"

export default function AppList({ name, apps, gridArea }) {
  return (
    <Container gridArea={gridArea}>
      <Header>{name}</Header>
      <InnerContainer className={gridArea}>
        {apps.map(app => {
          const encodedName = encodeAppName(app.name)
          const CurrItem = () => (
            <AppItem
              icon={"/logos/" + encodedName + ".png"}
              name={app.name}
              disabled={app.disabled}
            />
          )

          return app.disabled ? (
            <CurrItem key={app._id} />
          ) : (
            <a href={"/" + encodedName} key={app._id}>
              <CurrItem />
            </a>
          )
        })}
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  background: #2c2525;
  grid-area: ${props => props.gridArea};
  padding: 20px;

  @media (max-width: 992px) {
    padding: 15px 10px;
  }

  @media (max-width: 767px) {
    padding: 10px 6px;
  }
`

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  --appItemSize: 132px;


  @media (max-width: 1024px) {
    --appItemSize: 123px;
  }

  @media (max-width: 992px) {
    --appItemSize: 140px;
  }

  @media (max-width: 880px) {
    --appItemSize: 120px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
    --appItemSize: 137px;
  }

  @media (max-width: 650px) {
    --appItemSize: 130px;
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(4, 1fr);
    --appItemSize: 123px;
  }


  @media (max-width: 414px) {
    grid-template-columns: repeat(3, 1fr);
    --appItemSize: 119px;
  }

  @media (max-width: 375px) {
    --appItemSize: 106px;
  }
`

const Header = styled.h2`
  color: #e9e5e5;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 15px;
  margin-left: 5px;
`
