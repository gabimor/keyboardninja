import React from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import { encodeAppName } from "../helpers"
import AppItem from "./AppItem"

export default function AppList({ name, apps, shortName }) {
  return (
    <Container shortName={shortName}>
      <Header id={shortName}>{name}</Header>
      <InnerContainer>
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

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background: #2c2525;
`

const Container = styled.div`
  grid-area: ${props => props.shortName};
`

const Header = styled.h2`
  color: #e9e5e5;
  font-weight: 300;
  font-size: 16px;
  margin-bottom: 15px;
  text-transform: uppercase;
`
