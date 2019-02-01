import React from "react"
import Link from "next/link"
import CompanyName from "../../components/CompanyName"
import styled from "styled-components"
import { colors } from "../layout"

import { encodeAppName } from "../../helpers"


const Container = styled.div`
  line-height: 20px;
`

const CategoryName = styled.h3`
  color:${colors.darkRed};
  font-weight:600;
  border-bottom: solid 1px ${colors.lightRed};
  padding-bottom: 3px;
  margin-bottom: 5px;
`

const AppName = styled.span`
  color: ${colors.mainBG};
  cursor: pointer;
  display: inline-block;
  margin-right: 6px;
`

const App = ({ id, name, companyName }) => (
  <div key={id}>
    <Link
      href={"/searchResults?appId=" + id}
      as={"/apps/" + encodeAppName(name)}
    >
      <AppName>{name}</AppName>
    </Link>
    <CompanyName>{companyName}</CompanyName>
  </div>
)

export default function AppCategory({ name, apps }) {
  return (
    <Container>
      <CategoryName>{name}</CategoryName>
      {apps.map(app => (
        <App {...app} />
      ))}
    </Container>
  )
}
