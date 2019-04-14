import React, { useContext, useState } from "react" // eslint-disable-line no-unused-vars
import styled from "@emotion/styled"

import { copyToClipboard } from "../../helpers"
import DataContext from "../../DataContext"
import OSSelect from "./OSSelect"
import GetLink from "./GetLink"
import { getLink } from "../../helpers/api"

const Controls = ({ icon, name }) => {
  const { app, os, doSetOs } = useContext(DataContext)
  const [publicLink, setPublicLink] = useState()

  async function handleGetLink() {
    const shortcutIds = app.shortcuts.filter(e => e.isPinned).map(e => e._id)
    const link = await getLink(app._id, shortcutIds).then(data => data.text())
    setPublicLink(link)
    copyToClipboard(link)
  }

  function handleGetLinkClose() {
    setPublicLink()
  }

  return (
    <Container>
      <Icon src={"/logos/" + icon} />
      <Text>{name}</Text>
      <SearchWrapper />
      <OSSelect onSelect={doSetOs} os={os} oss={app.oss} />
      <Seperator />
      <GetLink
        onGetLink={handleGetLink}
        onClose={handleGetLinkClose}
        link={publicLink}
      />
    </Container>
  )
}

export default Controls

const Seperator = styled.div`
  height: 39px;
  border-left: solid 1px #5a5a5a;
  margin: 0 20px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 60px 0 40px 0;
  border-bottom: solid 1px #5a5a5a;
  position: sticky;
  top: 0;
  background: linear-gradient(#3c1b1b, #371616) no-repeat;
`

const Icon = styled.img`
  width: 50px;
`

const Text = styled.h1`
  font-size: 40px;
  margin-left: 20px;
  font-weight: 200;
`

const SearchWrapper = styled.div`
  position: relative;
  margin-right: 20px;
  margin-left: auto;
`
