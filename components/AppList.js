import React from "react"
import Link from "next/link"
import styled from "styled-components"

import { encodeAppName } from "../helpers"
import App from "./AppItem"

export default function AppList({ name, apps }) {
  return (
    <Container>
      <Header>{name}</Header>
      <InnerContainer>
        {apps.map(app => (
          <Link
            href={"/app?id=" + app.id}
            as={"/" + encodeAppName(app.name)}
            key={app.id}
          >
            <a>
              <App icon={"/static/logos/" + app.icon} name={app.name} />
            </a>
          </Link>
        ))}
      </InnerContainer>
    </Container>
  )
}

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background: #2C2525;
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
