import React from "react"
import Link from "next/link"
import styled from "styled-components"

import CompanyName from "./CompanyName"
import { colors } from "../pages/layout"
import { encodeAppName } from "../helpers"

const Container = styled.div`
  line-height: 22px;
`

const Header = styled.h3`
  color: ${colors.darkRed};
  font-weight: 500;
  border-bottom: solid 1px ${colors.lightRed};
  padding-bottom: 3px;
  margin-bottom: 10px;
`
const Li = styled.li`
  color: ${colors.darkRed};
  list-style: ${props => (props.isOrdered ? "ordered" : "none")};
`

const AppName = styled.span`
  color: ${colors.mainBG};
  cursor: pointer;
  display: inline-block;
  margin-right: 6px;
  margin-left: ${props => (props.isOrdered ? "3px" : 0)};
`

export default function AppList({ name, apps, isOrdered = false }) {
  return (
    <Container>
      <Header>{name}</Header>
      <ol>
        {apps.map(app => (
          <Li key={app.id} isOrdered={isOrdered}>
            <Link
              href={"/searchResults?appId=" + app.id}
              as={"/apps/" + encodeAppName(app.name)}
            >
              <a>
                <AppName isOrdered={isOrdered}>{app.name}</AppName>
              </a>
            </Link>
            <CompanyName>{app.companyName}</CompanyName>
          </Li>
        ))}
      </ol>
    </Container>
  )
}
