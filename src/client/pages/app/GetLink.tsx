import React, { useEffect, useRef } from "react"; // eslint-disable-line no-unused-vars

import Button from "../../components/Button";
import GetLinkPopup from "./GetLinkPopup";

interface Props {
  link: string;
  onGetLink: Function;
  onClose: Function;
}

const GetLink = ({ link, onGetLink, onClose }: Props) => {
  const popupElm = useRef(null);

  function handleClickAway(e) {
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
      <Button onClick={onGetLink}>
        <i className="fas fa-link" />
        &nbsp; Get Link
      </Button>
      {link && <GetLinkPopup link={link} ref={popupElm} />}
    </div>
  );
};

export default GetLink;
