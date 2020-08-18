import React from "react";
import styled from "@emotion/styled";

const GetLinkPopup = React.forwardRef((props, ref) => {
  return (
    <Container ref={ref}>
      <b>Done! </b>
      <Text>
        Your selected shortcuts are saved with this link. You can share it with
        friends or save it for future reference.
      </Text>
      <InputWrapper>
        <Input
          type="text"
          value={props.link}
          onFocus={(event) => event.target.select()}
          readOnly
        />
        <br />
        <small>Link copied to clipboard</small>
      </InputWrapper>
    </Container>
  );
});

export default GetLinkPopup;

const Container = styled.div`
  background: #2e2424;
  max-width: 300px;
  padding: 20px;
  position: relative;
  border-radius: 5px;
  box-shadow: 0px 7px 23px 10px rgba(0, 0, 0, 0.4);

  position: absolute;
  right: 0;
  top: 64px;

  :after {
    left: 80%;
    margin-left: -4px;
    top: -10px;
    border-bottom: 10px solid #2e2424;
    display: block;
    position: absolute;
    right: 20px;
    vertical-align: middle;
    content: "";
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-style: none double solid;
    width: 0;
    height: 0;
  }
  small {
    color: #9d8b8b;
  }
`;

const Input = styled.input`
  padding: 6px;
  border: solid 1px #423737;
  color: #ffe6ab;
  background: #261d1d;
  border-radius: 5px;
  font-size: 12px;
  width: 100%;
`;

const InputWrapper = styled.div`
  margin: 20px 0 10px;
`;

const Text = styled.div`
  font-weight: 300;
`;

// const Seperator = styled.hr`
//   border: 0;
//   border-top: 1px solid #453a3a;
// `
