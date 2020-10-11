import React, { FC } from "react";
import ReactModal from "react-modal";
import CloseX from "./CloseX";

const Modal: FC<ReactModal.Props> = (props) => (
  <ReactModal
    className="ReactModal__Content"
    overlayClassName="ReactModal__Overlay"
    closeTimeoutMS={200}
    {...props}
  >
    {props.children}
    <CloseX onClick={props.onRequestClose} />
  </ReactModal>
);

export default Modal;

ReactModal?.setAppElement("#root");

export const modalStyle = `
.ReactModal__Overlay {
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  transition: opacity 200ms ease-in-out;
  display:flex;
  justify-content:center;
  align-items:center;
}

.ReactModal__Overlay--after-open{
  opacity: 1;

}

.ReactModal__Overlay--before-close{
  opacity: 0;
}


.ReactModal__Content {
  position: relative;
  border: none;
  background: #401f20;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border-radius: 5px;
  outline: none;
  padding: 20px;
  min-width:330px;
}
`;
