import React from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import { encodeAppName } from "../helpers"
import AppItem from "./AppItem"

export default function AppList({ name, apps }) {
  return (
    <Container>
      <Header>{name}</Header>
      <InnerContainer>
        {apps.map(app => (
          <a href={"/" + encodeAppName(app.name)} key={app._id}>
            <AppItem icon={"/logos/" + app.icon} name={app.name} />
          </a>
        ))}
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
  margin-bottom: 60px;
`

const Header = styled.h3`
  color: #e9e5e5;
  font-weight: 300;
  font-size: 16px;
  margin-bottom: 15px;
  text-transform: uppercase;
`
