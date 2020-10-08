import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

import { copyToClipboard } from "../../helpers";
import { DataContext } from "../../DataContext";
import OSSelect from "./OSSelect";
import GetLink from "./GetLink";
import { getLink } from "../../api";
import { desktopBreakpoint, tabletBreakpoint } from "@client/consts";

interface Props {
  icon: string;
  name: string;
}

function Controls({ icon, name }: Props) {
  const store = useContext(DataContext);

  const [publicLink, setPublicLink] = useState("");

  async function handleGetLink() {
    const shortcutIds = store.app.shortcuts
      .filter((e) => e.isStarred)
      .map((e) => e._id);
    const link = await getLink(store.app._id, shortcutIds).then((data) =>
      data.text()
    );
    setPublicLink(link);
    copyToClipboard(link);
  }

  function handleGetLinkClose() {
    setPublicLink(undefined);
  }

  return (
    <Container>
      <NameWrapper>
        <Icon src={"/logos/" + icon} />
        <Name>{name}</Name>
      </NameWrapper>
      <SearchWrapper />
      <OSSelect
        onSelect={(os) => {
          store.setOs(os);
        }}
        os={store.os}
        oss={store.app.oss}
      />
      <Seperator />
      <GetLink
        onGetLink={handleGetLink}
        onClose={handleGetLinkClose}
        link={publicLink}
      />
    </Container>
  );
}

export default observer(Controls);

const Seperator = styled.div`
  height: 39px;
  border-left: solid 1px #5a5a5a;
  margin: 0 20px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin: 60px 0 40px 0;
  border-bottom: solid 1px #5a5a5a;
  position: sticky;
  top: 0;
  background: linear-gradient(#3c1b1b, #371616) no-repeat;

  @media (max-width: ${tabletBreakpoint}px) {
    margin: 30px 0 20px 0;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${tabletBreakpoint}px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  transition: all 0.5s;

  @media (max-width: ${desktopBreakpoint}px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: ${tabletBreakpoint}px) {
    width: 25px;
    height: 25px;
    margin-bottom: 4px;
  }
`;

const Name = styled.h1`
  font-size: 40px;
  margin-left: 20px;
  font-weight: 200;
  line-height: normal;

  transition: all 0.5s;

  @media (max-width: ${desktopBreakpoint}px) {
    font-size: 25px;
  }

  @media (max-width: ${tabletBreakpoint}px) {
    font-size: 12px;
    margin-left: 0;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-right: 20px;
  margin-left: auto;
`;
