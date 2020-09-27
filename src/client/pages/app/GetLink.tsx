import React, { useEffect, useRef } from "react";

import { PrimaryButton } from "../../components/Buttons";
import GetLinkPopup from "./GetLinkPopup";

interface Props {
  link: string;
  onGetLink: () => void;
  onClose: () => void;
}

const GetLink = ({ link, onGetLink, onClose }: Props) => {
  const popupElm = useRef(null);

  function handleClickAway(e: MouseEvent) {
    if (popupElm.current && !popupElm.current.contains(e.target)) onClose();
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickAway);

    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, []);

  return (
    <div>
      <PrimaryButton onClick={onGetLink}>
        <i className="fas fa-link" />
        &nbsp; Get Link
      </PrimaryButton>
      {link && <GetLinkPopup link={link} ref={popupElm} />}
    </div>
  );
};

export default GetLink;
