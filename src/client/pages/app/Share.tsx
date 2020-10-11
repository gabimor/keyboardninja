import React, { useRef, useState, useContext } from "react";
import { copyToClipboard } from "@client/helpers";
import { getShareLink } from "@client/api";

import { PrimaryButton } from "@client/components/Buttons";
import GetLinkPopup from "./SharePopup";

import { DataContext } from "@client/DataContext";
import useOnClickOutside from "use-onclickoutside";

const Share = () => {
  const popupRef = useRef(null);
  const store = useContext(DataContext);
  useOnClickOutside(popupRef, () => setPublicLink(""));

  const [publicLink, setPublicLink] = useState("");

  async function handleShare() {
    const shortcutIds = store.app.shortcuts
      .filter((e) => e.isStarred)
      .map((e) => e._id);
    const link = await getShareLink(store.app._id, shortcutIds).then((data) =>
      data.text()
    );
    setPublicLink(link);
    copyToClipboard(link);
  }

  return (
    <div>
      <PrimaryButton onClick={handleShare}>
        <i className="fas fa-link" />
        &nbsp; Share
      </PrimaryButton>
      {publicLink && <GetLinkPopup link={publicLink} ref={popupRef} />}
    </div>
  );
};

export default Share;
